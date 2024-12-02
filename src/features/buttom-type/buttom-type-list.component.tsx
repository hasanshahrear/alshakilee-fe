"use client";

import { Api, QueryKey, useDelete } from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { PageHeader } from "@/features/ui";
import { CustomDataTable, TableAction } from "@/features/ui/data-table";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { ButtomTypeCreateUpdate } from "./buttom-type-create-update.component";
import { bottomTypeBreadcrumb } from "./data";

export function ButtomType() {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const handleEdit = (id: number) => {
    setId(id);
    setVisible(true);
  };

  const { mutateAsync } = useDelete({
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
    await mutateAsync();
  };

  return (
    <div className="flex flex-col gap-4">
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
          { field: "name", header: "Name" },
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
