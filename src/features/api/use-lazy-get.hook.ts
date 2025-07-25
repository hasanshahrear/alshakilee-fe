import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";

type TProps = {
  url: string;
  queryParams?: AxiosRequestConfig["params"];
  queryKey: string;
  trigger?: boolean;
};

export function useLazyGet<ResponseType = Record<string, unknown>>({
  url,
  queryParams: params,
  queryKey,
  trigger = false,
  ...rest
}: TProps) {
  const { data } = useSession();
  const fetchFunction = async () => {
    const response: AxiosResponse<ResponseType> = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/" + url,
      {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        params,
      },
    );
    return response.data;
  };

  return useQuery({
    queryKey: [queryKey, params],
    queryFn: fetchFunction,
    enabled: trigger,
    ...rest,
  });
}
