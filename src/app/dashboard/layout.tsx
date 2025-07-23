"use client";

import { DashboardIcon, InvoiceIcon, PeopleIcon } from "@/features/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { CgLogOut } from "react-icons/cg";

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

const Sidebar = () => {
  const { data } = useSession();
  const handleLogout = async () => {
    await signOut().then(() => {
      window.location.href = "/api/auth/signin";
    });
  };
  return (
    <div className="flex h-full flex-col justify-between">
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
      <div className="flex-grow" />
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="flex items-center gap-2 text-base">
          <AiOutlineUser className="text-lg" />
          {data?.user?.name}
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-primary"
        >
          <CgLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: Readonly<TProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-4 bg-[#F1F4FA] p-3 lg:flex-row lg:gap-6 xxl:p-12">
      <div className="hidden h-[calc(100vh-8rem)] w-[220px] rounded-2xl bg-white p-4 shadow-md lg:block xxl:p-[30px]">
        <Sidebar />
      </div>

      <button
        onClick={toggleSidebar}
        className="flex items-center justify-between gap-2 rounded-md bg-primary px-3 py-2 font-medium text-white lg:hidden"
      >
        Menu
        <AiOutlineMenu className="text-2xl text-white" />
      </button>

      {isOpen && (
        <div className="fixed left-0 top-0 z-50 h-screen w-[220px] rounded-2xl bg-white p-4 shadow-md lg:hidden xxl:p-[30px]">
          <Sidebar />
        </div>
      )}

      <div className="w-full">{children}</div>
    </div>
  );
}
