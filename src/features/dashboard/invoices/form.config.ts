import { SDType } from "@/features/api/commom-enum";
import * as yup from "yup";

export const invoiceItemSchema = yup.object({
  designTypeId: yup.number().required().label("Design Type"),
  bottomTypeId: yup.number().required().label("Buttom Type"),
  quantity: yup.number().required().label("Quantity"),
  length: yup.number().required().label("Length"),
  shoulder: yup.number().required().label("Shoulder"),
  hand: yup.number().required().label("Hand"),
  handLouse: yup.number().required().label("Hand Louse"),
  neck: yup.number().required().label("Neck"),
  neckLouse: yup.number().required().label("Neck Louse"),
  centreLouse: yup.number().required().label("Centre Louse"),
  sdType: yup
    .string()
    .oneOf([SDType.SD, SDType.No_SD])
    .required()
    .label("SD Type"),
  pocketStyle: yup.string().oneOf(["P2_Bag"]).required().label("Pocket Style"),
  sewingType: yup.string().oneOf(["Chap"]).required().label("Sewing Type"),
});

export const invoicesCreateUpdateSchema = yup.object({
  customerId: yup.number().required().label("Customer"),
  deliveryDate: yup.date().required().label("Delivery Date"),
});

export type TInvoicesCreateUpdateType = yup.InferType<
  typeof invoicesCreateUpdateSchema
>;

export const initailValue: TInvoicesCreateUpdateType = {
  name: "",
};
