import { GlobalProvider } from "@/features/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alshakilee",
  description: "A simple invoicing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
