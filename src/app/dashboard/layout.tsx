"use client"

import { ButtomIcon, DashboardIcon, DesignIcon, InvoiceIcon, PeopleIcon } from "@/features/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TProps = {
  children: React.ReactNode;
};

type TCustomLinkProps = {
  href: string;
  children: React.ReactNode;
}

const CustomLink = ({href, children}:TCustomLinkProps) => {
  const pathname = usePathname(); 
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  const activeClass = isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"; 

  return (
    <Link href={href} className={`${activeClass} rounded-[10px] py-3 px-6 font-medium flex items-center gap-2`}>
      {children}
    </Link>
  )
}

export default function DashboardLayout({ children }: Readonly<TProps>) {
  return (
    <div className="flex gap-4 p-12 bg-[#F1F4FA]">
      <div className="h-[calc(100vh-8rem)] w-[280px] rounded-2xl p-[30px] shadow-md bg-white">
        <h1 className="text-3xl font-bold p-2.5 mb-6 font-title text-center text-primary">Alshakilee</h1>

        <div className="flex flex-col gap-1">
          <CustomLink href="/dashboard"><DashboardIcon /> Dashboard</CustomLink>
          <CustomLink href="/dashboard/invoices"><InvoiceIcon /> Invoices</CustomLink>
          <CustomLink href="/dashboard/customer"><PeopleIcon /> Customer</CustomLink>
          <CustomLink href="/dashboard/design-type"><DesignIcon /> Design</CustomLink>
          <CustomLink href="/dashboard/buttom-type"><ButtomIcon /> Buttom</CustomLink>
        </div>
      </div>

      <div className="w-full p-4 pt-2">{children}</div>
    </div>
  );
}
