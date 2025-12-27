"use client";

import { EmployeeType } from "@/features/dashboard";
import { Suspense } from "react";

export default function EmployeeTypePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeeType />
    </Suspense>
  );
}
