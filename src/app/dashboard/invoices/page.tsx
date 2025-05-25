import { Invoices } from "@/features/dashboard";
import { Suspense } from "react";

export default function InvoicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Invoices />
    </Suspense>
  );
}
