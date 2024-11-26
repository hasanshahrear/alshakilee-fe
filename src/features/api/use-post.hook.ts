"use client";

import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

type TProps<RequestType, ResponseType> = {
  url: string;
} & UseMutationOptions<
  AxiosResponse<ResponseType>,
  AxiosError,
  RequestType,
  MutationFunction<AxiosResponse<ResponseType>, RequestType>
>;

export function usePost<
  RequestType = Record<string, unknown>,
  ResponseType = Record<string, unknown>,
>({ url, ...rest }: TProps<RequestType, ResponseType>) {
  const fetchFunction: MutationFunction<
    AxiosResponse<ResponseType>,
    RequestType
  > = async (data: RequestType) => {
    try {
      let response: AxiosResponse<ResponseType>;
      response = await axios.post(process.env.NEXT_PUBLIC_API_URL + url, data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return useMutation<
    AxiosResponse<ResponseType>,
    AxiosError,
    RequestType,
    MutationFunction<AxiosResponse<ResponseType>, RequestType>
  >({
    mutationFn: (data) => fetchFunction(data),
    ...(rest as UseMutationOptions<
      AxiosResponse<ResponseType>,
      AxiosError,
      RequestType,
      MutationFunction<AxiosResponse<ResponseType>, RequestType>
    >),
  });
}
