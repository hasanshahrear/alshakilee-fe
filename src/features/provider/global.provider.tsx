"use client";

import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toaster } from "sonner";
import { SelectInvoiceProvider } from "./select-invoice.provider";
import AuthProvider from "./auth.provider";

type TProps = {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: Readonly<TProps>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <AuthProvider>
          <SelectInvoiceProvider>{children}</SelectInvoiceProvider>
        </AuthProvider>
      </PrimeReactProvider>
      <Toaster
        richColors
        position="top-right"
        closeButton
      />
      <NextTopLoader />
    </QueryClientProvider>
  );
}
