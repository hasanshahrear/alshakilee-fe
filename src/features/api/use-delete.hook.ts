"use client";

import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type TProps<ResponseType> = {
  url: string;
} & UseMutationOptions<ResponseType, AxiosError>;

export function useDelete<ResponseType = unknown>({
  url,
  ...options
}: TProps<ResponseType>) {
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;

  const fetchFunction: MutationFunction<ResponseType> = async () => {
    const response = await axios.delete<ResponseType>(requestUrl);
    return response.data;
  };

  return useMutation<ResponseType, AxiosError>({
    mutationFn: fetchFunction,
    ...options,
  });
}
