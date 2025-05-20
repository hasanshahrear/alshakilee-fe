"use client";

import { DashboardIcon, InvoiceIcon, PeopleIcon } from "@/features/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TProps = {
  children: React.ReactNode;
};

type TCustomLinkProps = {
  href: string;
  children: React.ReactNode;
};

const CustomLink = ({ href, children }: TCustomLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive
    ? "bg-primary text-white"
    : "text-gray-700 hover:bg-gray-100";

  return (
    <Link
      href={href}
      className={`${activeClass} flex items-center gap-2 rounded-[10px] px-6 py-3 font-medium`}
    >
      {children}
    </Link>
  );
};

export default function DashboardLayout({ children }: Readonly<TProps>) {
  return (
    <div className="flex gap-4 bg-[#F1F4FA] p-12">
      <div className="h-[calc(100vh-8rem)] w-[280px] rounded-2xl bg-white p-[30px] shadow-md">
        <h1 className="mb-6 p-2.5 text-center font-title text-3xl font-bold text-primary">
          Alshakilee
        </h1>

        <div className="flex flex-col gap-1">
          <CustomLink href="/dashboard">
            <DashboardIcon /> Dashboard
          </CustomLink>
          <CustomLink href="/dashboard/invoices">
            <InvoiceIcon /> Invoices
          </CustomLink>
          <CustomLink href="/dashboard/customer">
            <PeopleIcon /> Customer
          </CustomLink>
        </div>
      </div>

      <div className="w-full p-4 pt-2">{children}</div>
    </div>
  );
}
