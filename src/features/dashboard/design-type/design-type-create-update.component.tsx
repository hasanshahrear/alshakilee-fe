"use client";

import { Api, QueryKey, useGet, usePost, usePut } from "@/features/api";
import {
  TGetDesignTypeByID,
  TGlobalErrorResponse,
  TGlobalSuccessResponse,
} from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { DesignTypeCreateUpdateForm } from "./design-type-create-update.form";
import {
  designCreateUpdateSchema,
  initailValue,
  TDesignCreateUpdateType,
} from "./form.config";

type TProps = {
  id?: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export function DesignTypeCreateUpdate({ id, setVisible }: TProps) {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TDesignCreateUpdateType>({
    url: Api.DesignType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllDesignType],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const { data: dataGetById } = useGet<TGetDesignTypeByID>({
    queryKey: QueryKey.GetAllDesignType,
    url: Api.DesignType + "/" + id,
    enabled: !!id,
  });

  const { mutateAsync: mutateAsyncPut } = usePut({
    url: Api.DesignType + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GetAllDesignType],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
  });

  const handleSubmit = async (values: TDesignCreateUpdateType) => {
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
      validationSchema={designCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <DesignTypeCreateUpdateForm id={id} />
    </Formik>
  );
}
