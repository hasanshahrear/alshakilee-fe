"use client";

import { Api, QueryKey, usePatch } from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { PageHeader } from "@/features/ui";
import { CustomDataTable, TableAction } from "@/features/ui/data-table";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { UserCreateUpdate } from "./user-create-update.component";
import { userBreadcrumb } from "./data";

type TPatchUserType = {
  isActive: boolean;
};

export function UserList() {
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  const handleEdit = (id: number) => {
    setId(id);
    setVisible(true);
  };

  const { mutateAsync } = usePatch<TPatchUserType>({
    url: Api.User + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Users],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
    },
    onError: (error) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const handleDelete = async (id: number) => {
    setId(id);
    handleDeleteDialog();
  };

  const accept = async () => {
    await mutateAsync({ isActive: Number(activeStatus) !== 0 });
  };

  const handleDeleteDialog = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: <BsExclamationTriangle />,
      defaultFocus: "accept",
      accept: () => {
        accept();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <ConfirmDialog
        pt={{
          acceptButton: {
            className: `${Number(activeStatus) === 0 ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} border-none shadow-none`,
          },
          rejectButton: {
            className: "text-gray-600 border-none shadow-none",
          },
        }}
      />
      <PageHeader
        breadCrumbJson={userBreadcrumb}
        title="Users"
        buttonText="Create"
        buttonClick={() => {
          if (visible) return;
          setVisible(true);
        }}
      />
      <CustomDataTable
        url={Api.User}
        queryKey={QueryKey.Users}
        columns={[
          { field: "name", header: "Name" },
          { field: "phone", header: "Phone" },
          { field: "role", header: "Role" },
          { field: "employeeType.name", header: "Employee Type" },
          {
            field: "isActive",
            header: "Status",
            align: "center",
          },
          {
            field: "id",
            header: "Actions",
            align: "center",
            body: ({ id }) => (
              <TableAction
                handleEdit={() => handleEdit(id)}
                handleDelete={() => handleDelete(id)}
              />
            ),
          },
        ]}
      />
      <Dialog
        header="User"
        modal
        visible={visible}
        onHide={() => {
          setId(0);
          setVisible(false);
        }}
        style={{ width: "30vw" }}
      >
        <UserCreateUpdate
          id={id || undefined}
          setVisible={setVisible}
        />
      </Dialog>
    </div>
  );
}
