import { InvoicesCreateUpdate } from "@/features/dashboard";
import { Suspense } from "react";

export default function InvoicesCreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoicesCreateUpdate />;
    </Suspense>
  );
}
