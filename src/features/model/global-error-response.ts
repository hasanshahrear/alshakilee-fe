import { AxiosError } from "axios";

type TError = {
  message?: string;
  statusCode?: number;
};

export type TGlobalErrorResponse = AxiosError<TError>;
