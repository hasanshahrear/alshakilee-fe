"use client";

import { InvoiceTrackingList } from "@/features/dashboard/invoice-tracking/invoice-tracking-list.component";
import { Suspense } from "react";

export default function InvoiceTrackingPage() {
  return (
    <Suspense>
      <InvoiceTrackingList />
    </Suspense>
  );
}
