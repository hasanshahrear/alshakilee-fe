import { InvoicesCreateUpdate } from "@/features/dashboard";

export default async function InvoicesUpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <InvoicesCreateUpdate slug={slug} />;
}
