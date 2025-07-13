"use client";

import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";

type TProps<RequestType, ResponseType> = {
  url: string;
} & UseMutationOptions<
  AxiosResponse<ResponseType>,
  AxiosError,
  RequestType,
  MutationFunction<AxiosResponse<ResponseType>, RequestType>
>;

export function usePut<
  RequestType = Record<string, unknown>,
  ResponseType = Record<string, unknown>,
>({ url, ...rest }: TProps<RequestType, ResponseType>) {
  const requestUrl = process.env.NEXT_PUBLIC_API_URL + "/" + url;
  const { data: session } = useSession();

  const fetchFunction: MutationFunction<ResponseType, RequestType> = async (
    data: RequestType,
  ) => {
    const response: AxiosResponse<ResponseType> = await axios.put(
      requestUrl,
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
    return response.data;
  };

  return useMutation<
    ResponseType,
    AxiosError,
    RequestType,
    MutationFunction<ResponseType, RequestType>
  >({
    mutationFn: (data) => fetchFunction(data),
    ...(rest as UseMutationOptions<
      ResponseType,
      AxiosError,
      RequestType,
      MutationFunction<ResponseType, RequestType>
    >),
  });
}
