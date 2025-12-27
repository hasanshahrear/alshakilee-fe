"use client";
import { UserList } from "@/features/dashboard/user/user-list.component";
import { Suspense } from "react";

export default function UserListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserList />
    </Suspense>
  );
}
