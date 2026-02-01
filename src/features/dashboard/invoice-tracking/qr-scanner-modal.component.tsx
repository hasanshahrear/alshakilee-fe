"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";

interface QrScannerModalProps {
  visible: boolean;
  onHide: () => void;
  onScan: (invoiceId: string) => void;
}

export function QrScannerModal({
  visible,
  onHide,
  onScan,
}: QrScannerModalProps) {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraError, setCameraError] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const isStoppingRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    isStoppingRef.current = false;

    // Suppress AbortError from video playback interruption
    const handleError = (event: ErrorEvent) => {
      if (
        event.message &&
        event.message.includes("play() request was interrupted")
      ) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };

    // Suppress unhandled promise rejections for AbortError
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        (event.reason.name === "AbortError" ||
          (event.reason.message &&
            event.reason.message.includes("play() request was interrupted")))
      ) {
        event.preventDefault();
        console.log("Suppressed AbortError from video playback");
        return true;
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    if (visible) {
      // Reset states
      setScanning(false);
      setCameraError("");
      setScanSuccess(false);

      // Small delay to ensure DOM is ready and cleanup is complete
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          initScanner();
        }
      }, 200);

      return () => {
        window.removeEventListener("error", handleError, true);
        window.removeEventListener(
          "unhandledrejection",
          handleUnhandledRejection,
        );
        isMountedRef.current = false;
        clearTimeout(timer);
        stopScanner();
      };
    } else {
      // When closing, reset all states
      setScanning(false);
      setCameraError("");
      setScanSuccess(false);
      stopScanner();
    }

    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      isMountedRef.current = false;
    };
  }, [visible]);

  const initScanner = async () => {
    if (!isMountedRef.current || isStoppingRef.current) return;

    setIsInitializing(true);
    setCameraError("");

    try {
      // Wait a moment to ensure any previous scanner is fully cleaned up
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if element exists
      const element = document.getElementById("qr-reader");
      if (!element || !isMountedRef.current) {
        console.error("QR reader element not found or component unmounted");
        setCameraError("Scanner initialization failed. Please try again.");
        setIsInitializing(false);
        return;
      }

      // Clear the element content
      element.innerHTML = "";

      // Stop any existing scanner
      if (scannerRef.current) {
        await stopScanner();
        // Wait for cleanup to complete
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (!isMountedRef.current) return;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.777778, // 16:9
        disableFlip: false,
      };

      // Try to use back camera first, fallback to any available camera
      const cameraConfig: any = { facingMode: "environment" };

      try {
        // Start the scanner - it will request permission automatically
        await scanner.start(
          cameraConfig,
          config,
          (decodedText: string) => {
            if (isMountedRef.current) {
              handleScan(decodedText);
            }
          },
          (errorMessage: string) => {
            // Ignore continuous decode errors
          },
        );

        if (!isMountedRef.current) {
          await stopScanner();
          return;
        }

        // Wait a bit for video to be properly loaded
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (!isMountedRef.current) {
          await stopScanner();
          return;
        }

        console.log("Scanner started successfully");
      } catch (error: any) {
        // If back camera fails, try with any available camera
        if (error.name === "OverconstrainedError" && isMountedRef.current) {
          console.log("Back camera not available, trying any camera...");
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length > 0 && isMountedRef.current) {
            const cameraId = devices[devices.length - 1].id;
            await scanner.start(
              cameraId,
              config,
              (decodedText: string) => {
                if (isMountedRef.current) {
                  handleScan(decodedText);
                }
              },
              (errorMessage: string) => {
                // Ignore continuous decode errors
              },
            );
          } else {
            throw new Error("No cameras found on this device");
          }
        } else {
          throw error;
        }
      }

      if (isMountedRef.current) {
        setScanning(true);
        setCameraError("");
        setIsInitializing(false);
      }
    } catch (err: any) {
      console.error("Error starting scanner:", err);

      if (!isMountedRef.current) return;

      let errorMessage = "Unable to access camera. Please check permissions.";

      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        errorMessage =
          "Camera permission denied. Please allow camera access in your browser settings.";
      } else if (err.name === "NotFoundError") {
        errorMessage = "No camera found on this device.";
      } else if (err.name === "NotReadableError") {
        errorMessage = "Camera is already in use by another application.";
      } else if (err.message) {
        errorMessage = `Camera error: ${err.message}`;
      }

      setCameraError(errorMessage);
      toast.error(errorMessage);
      setIsInitializing(false);
    }
  };

  const stopScanner = async () => {
    if (isStoppingRef.current) {
      // Already stopping, wait for it to complete
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }

    isStoppingRef.current = true;

    if (scannerRef.current) {
      try {
        const scanner = scannerRef.current;
        scannerRef.current = null;

        if (scanner.isScanning) {
          await scanner.stop().catch((err: any) => {
            // Ignore errors during stop, especially AbortError
            console.log("Scanner stop error (ignored):", err.name);
          });
        }

        try {
          scanner.clear();
        } catch (err: any) {
          // Ignore errors during clear
          console.log("Scanner clear error (ignored):", err.name);
        }

        // Clear the DOM element
        const element = document.getElementById("qr-reader");
        if (element) {
          element.innerHTML = "";
        }
      } catch (err) {
        console.error("Error stopping scanner:", err);
      } finally {
        if (isMountedRef.current) {
          setScanning(false);
        }
        // Wait a bit before allowing another scanner to start
        await new Promise((resolve) => setTimeout(resolve, 100));
        isStoppingRef.current = false;
      }
    } else {
      isStoppingRef.current = false;
    }
  };

  const handleScan = async (data: string) => {
    if (data && !scanSuccess && isMountedRef.current) {
      setScanSuccess(true);

      // Stop scanner first
      await stopScanner();

      // Small delay for visual feedback
      setTimeout(() => {
        if (isMountedRef.current) {
          // Parse QR code data (expecting invoice ID)
          onScan(data);
          onHide();
        }
        setScanSuccess(false);
      }, 500);
    }
  };

  const handleClose = async () => {
    await stopScanner();
    setTimeout(() => {
      onHide();
    }, 100);
  };

  return (
    <Dialog
      header="Scan Invoice QR Code"
      visible={visible}
      onHide={handleClose}
      style={{ width: "90vw", maxWidth: "500px" }}
      modal
      dismissableMask
      draggable={false}
      className="qr-scanner-dialog"
    >
      <div className="flex flex-col items-center gap-4 p-4">
        {cameraError ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-red-300 bg-red-50 p-6 text-center">
            <div className="text-5xl">📷</div>
            <p className="text-red-700">{cameraError}</p>
            <Button
              label="Try Again"
              onClick={initScanner}
              className="mt-2"
              severity="danger"
              loading={isInitializing}
            />
          </div>
        ) : (
          <>
            <div className="relative w-full">
              {/* Always render qr-reader div so scanner can initialize */}
              <div
                id="qr-reader"
                className={`w-full overflow-hidden rounded-lg shadow-lg transition-all ${
                  scanSuccess
                    ? "border-4 border-green-500"
                    : "border-4 border-blue-400"
                }`}
                style={{ minHeight: "400px", maxHeight: "500px" }}
              />

              {/* Loading overlay */}
              {isInitializing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white/90">
                  <div className="animate-pulse text-5xl">📷</div>
                  <p className="mt-4 text-lg font-semibold text-blue-700">
                    Requesting camera access...
                  </p>
                  <p className="text-sm text-blue-600">
                    Please allow camera access in your browser
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-blue-500"></span>
                    <span
                      className="inline-block h-2 w-2 animate-bounce rounded-full bg-blue-500"
                      style={{ animationDelay: "0.1s" }}
                    ></span>
                    <span
                      className="inline-block h-2 w-2 animate-bounce rounded-full bg-blue-500"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                  </div>
                </div>
              )}

              {/* Success overlay */}
              {scanSuccess && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500/20">
                  <div className="rounded-full bg-green-500 p-4">
                    <svg
                      className="h-12 w-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="mb-2 text-sm font-medium text-gray-700">
                {scanSuccess
                  ? "✓ QR Code detected!"
                  : isInitializing
                    ? "Starting camera..."
                    : scanning
                      ? "Position the QR code within the frame"
                      : "Initializing camera..."}
              </p>
              {!scanSuccess && !isInitializing && (
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  <span>Camera active</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
