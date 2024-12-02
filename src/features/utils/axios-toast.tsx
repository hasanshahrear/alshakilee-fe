import { TGlobalErrorResponse, TGlobalSuccessResponse } from "@/features/model";
import { toast } from "sonner";

export function axiosSuccessToast(data: TGlobalSuccessResponse) {
  return toast.success(data?.message);
}
export function axiosErrorToast(error: TGlobalErrorResponse) {
  return toast.error(error?.response?.data?.message);
}
