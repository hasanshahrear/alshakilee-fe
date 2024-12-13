import * as yup from "yup";

export const invoiceItemSchema = yup.object({
  designTypeId: yup.number().required().label("Design Type").positive(),
  bottomTypeId: yup.number().required().label("Buttom Type").positive(),
  quantity: yup.number().required().label("Quantity").positive(),
  length: yup.number().required().label("Length").positive(),
  shoulder: yup.number().required().label("Shoulder").positive(),
  hand: yup.number().required().label("Hand").positive(),
  handLouse: yup.number().required().label("Hand Louse").positive(),
  neck: yup.number().required().label("Neck").positive(),
  neckLouse: yup.number().required().label("Neck Louse").positive(),
  centreLouse: yup.number().required().label("Centre Louse").positive(),
  sdType: yup.string().nullable().label("SD Type"),
  pocketStyle: yup.string().required().label("Pocket Style"),
  sewingType: yup.string().required().label("Sewing Type"),
});

export type TInvoiceItemType = yup.InferType<typeof invoiceItemSchema>;

export const initialItemValue: TInvoiceItemType = {
  designTypeId: 0,
  bottomTypeId: 0,
  centreLouse: 0,
  hand: 0,
  handLouse: 0,
  length: 0,
  neck: 0,
  neckLouse: 0,
  quantity: 0,
  shoulder: 0,
  pocketStyle: "P2",
  sewingType: "Chap",
  sdType: "SD",
};

export const invoicesCreateUpdateSchema = yup.object({
  customerId: yup.number().required().label("Customer"),
  deliveryDate: yup.date().required().label("Delivery Date"),
  items: yup.array().of(invoiceItemSchema).min(1),
});

export type TInvoicesCreateUpdateType = yup.InferType<
  typeof invoicesCreateUpdateSchema
>;

export const initailValue: TInvoicesCreateUpdateType = {
  customerId: 0,
  deliveryDate: new Date(),
  items: [initialItemValue],
};
