"use client";

import { Api, QueryKey, useGet, usePost, usePut } from "@/features/api";
import {
  TGetButtomTypeByID,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { ButtomTypeCreateUpdateForm } from "./buttom-type-create-update.form";
import {
  buttomCreateUpdateSchema,
  initailValue,
  TButtomCreateUpdateType,
} from "./form.config";

type TProps = {
  id?: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export function ButtomTypeCreateUpdate({ id, setVisible }: TProps) {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TButtomCreateUpdateType>({
    url: Api.BottomType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllBottomType],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const { data: dataGetById } = useGet<TGetButtomTypeByID>({
    queryKey: QueryKey.GetAllBottomType,
    url: Api.BottomType + "/" + id,
    enabled: !!id,
  });

  const { mutateAsync: mutateAsyncPut } = usePut({
    url: Api.BottomType + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllBottomType],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
  });

  const handleSubmit = async (values: TButtomCreateUpdateType) => {
    if (id) {
      await mutateAsyncPut(values);
      return;
    }
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={
        id
          ? {
              name: dataGetById?.data?.name as string,
            }
          : initailValue
      }
      validationSchema={buttomCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <ButtomTypeCreateUpdateForm id={id} />
    </Formik>
  );
}
