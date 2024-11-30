"use client";

import { Api, QueryKey, usePost } from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
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
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export function ButtomTypeCreateUpdate({ setVisible }: TProps) {
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

  const handleSubmit = async (values: TButtomCreateUpdateType) => {
    await mutateAsync(values);
  };
  return (
    <Formik
      initialValues={initailValue}
      validationSchema={buttomCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <ButtomTypeCreateUpdateForm />
    </Formik>
  );
}
