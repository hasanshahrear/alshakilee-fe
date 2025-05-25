"use client";

import { Customer } from "@/features/dashboard";
import { Suspense } from "react";

export default function CustomerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Customer />
    </Suspense>
  );
}
