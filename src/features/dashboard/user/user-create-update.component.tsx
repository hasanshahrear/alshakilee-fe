"use client";

import {
  Api,
  QueryKey,
  useGet,
  useLazyGet,
  usePost,
  usePut,
} from "@/features/api";
import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { axiosErrorToast, axiosSuccessToast } from "@/features/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { UserCreateUpdateForm } from "./user-create-update.form";
import { TCustomerCreateUpdateType } from "../customer/form.config";
import { TEmployeeTypeCreateUpdateType } from "../employee-type";
import {
  initialValue,
  TUserCreateType,
  TUserUpdateType,
  userCreateSchema,
  userUpdateSchema,
} from "./form.config";

type TProps = {
  id?: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export function UserCreateUpdate({ id, setVisible }: Readonly<TProps>) {
  const queryClient = useQueryClient();

  const { mutateAsync } = usePost<TUserCreateType>({
    url: Api.User,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Users],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
    onError: (error: AxiosError) => {
      axiosErrorToast(error as TGlobalErrorResponse);
    },
  });

  const { data: dataGetById } = useLazyGet<TUserCreateType>({
    queryKey: QueryKey.GetUserById,
    url: Api.User + "/" + id,
    trigger: !!id,
  });

  const { mutateAsync: mutateAsyncPut } = usePut<TUserUpdateType>({
    url: Api.User + "/" + id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Users],
      });
      axiosSuccessToast(data as TGlobalSuccessResponse);
      setVisible(false);
    },
  });

  const handleSubmit = async (values: TUserCreateType | TUserUpdateType) => {
    if (id) {
      await mutateAsyncPut(values as TUserUpdateType);
      return;
    }
    await mutateAsync(values as TUserCreateType);
  };

  return (
    <Formik
      initialValues={
        id
          ? {
              name: dataGetById?.name || "",
              phone: dataGetById?.phone || "",
              role: dataGetById?.role || "EMPLOYEE",
              employeeTypeId: dataGetById?.employeeTypeId,
              isActive: dataGetById?.isActive || false,
            }
          : initialValue
      }
      validationSchema={id ? userUpdateSchema : userCreateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <UserCreateUpdateForm id={id} />
    </Formik>
  );
}
