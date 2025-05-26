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
import { CustomerTypeCreateUpdate } from "./customer-type-create-update.component";
import { customerTypeBreadcrumb } from "./data";

type TPatchCustomer = {
  isActive: boolean;
};

export function Customer() {
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  const handleEdit = (id: number) => {
    setId(id);
    setVisible(true);
  };

  const { mutateAsync } = usePatch<TPatchCustomer>({
    url: Api.Customer + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllCustomer],
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
        breadCrumbJson={customerTypeBreadcrumb}
        title="Customer"
        buttonText="Create"
        buttonClick={() => {
          if (visible) return;
          setVisible(true);
        }}
      />
      <CustomDataTable
        url={Api.Customer}
        queryKey={QueryKey.GetAllCustomer}
        columns={[
          { field: "name", header: "Name" },
          { field: "mobile", header: "Mobile No" },
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
        header="Customer Type"
        visible={visible}
        maximizable
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setId(0);
        }}
        className="m-5 w-full lg:m-0 lg:w-1/3"
      >
        <CustomerTypeCreateUpdate
          id={id}
          setVisible={setVisible}
        />
      </Dialog>
    </div>
  );
}
