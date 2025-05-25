import { InvoicesCreateUpdate } from "@/features/dashboard";
import { Suspense } from "react";

export default async function InvoicesUpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoicesCreateUpdate slug={slug} />;
    </Suspense>
  );
}
