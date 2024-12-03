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
import { ButtomTypeCreateUpdate } from "./buttom-type-create-update.component";
import { bottomTypeBreadcrumb } from "./data";

type TPatchButtom = {
  isActive: boolean;
};

export function ButtomType() {
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  const handleEdit = (id: number) => {
    setId(id);
    setVisible(true);
  };

  const { mutateAsync } = usePatch<TPatchButtom>({
    url: Api.BottomType + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllBottomType],
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
    await mutateAsync({ isActive: Number(activeStatus) === 0 ? false : true });
  };

  const handleDeleteDialog = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: <BsExclamationTriangle />,
      defaultFocus: "accept",
      accept,
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
        breadCrumbJson={bottomTypeBreadcrumb}
        title="Buttom Type"
        buttonText="Create"
        buttonClick={() => {
          if (visible) return;
          setVisible(true);
        }}
      />
      <CustomDataTable
        url={Api.BottomType}
        queryKey={QueryKey.GetAllBottomType}
        columns={[
          { field: "name", header: "Buttom Name" },
          {
            field: "isActive",
            header: "Status",
          },
          {
            field: "id",
            header: "Actions",
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
        header="Buttom Type"
        visible={visible}
        maximizable
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setId(0);
        }}
        className="w-1/3"
      >
        <ButtomTypeCreateUpdate
          id={id}
          setVisible={setVisible}
        />
      </Dialog>
    </div>
  );
}
