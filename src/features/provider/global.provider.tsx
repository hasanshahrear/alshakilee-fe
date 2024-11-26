"use client";

import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";

type TProps = {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: Readonly<TProps>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </QueryClientProvider>
  );
}
