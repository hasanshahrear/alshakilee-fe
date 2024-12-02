import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type TProps = {
  url: string;
  queryParams?: AxiosRequestConfig["params"];
  queryKey: string;
  enabled?: boolean;
};

export function useGet<ResponseType = Record<string, unknown>>({
  url,
  queryParams: params,
  queryKey,
  enabled = true,
  ...rest
}: TProps) {
  const fetchFunction = async () => {
    try {
      const response: AxiosResponse<ResponseType> = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/" + url,
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery({
    queryKey: [queryKey, params],
    queryFn: fetchFunction,
    enabled,
    ...rest,
  });
}
