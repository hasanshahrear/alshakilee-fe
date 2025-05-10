import * as yup from "yup";

export const invoiceItemSchema = yup.object({
  length: yup.number().required().label("Length").positive(),
  shoulder: yup.number().required().label("Shoulder").positive(),
  hand: yup.number().required().label("Hand").positive(),
  handLoose: yup.number().required().label("Hand Loose"),
  neck: yup.number().required().label("Neck").positive(),
  loose: yup.number().required().label("Loose"),
  centreLoose: yup.number().required().label("Centre Loose"),
  bottom: yup.number().required().label("Bottom"),
  open: yup.number().required().label("Open"),
  button: yup.string().required().label("Button"),
  design: yup.string().required().label("Design"),
  pocket: yup.string().required().label("Pocket"),
  sewing: yup.string().required().label("Sewing"),
  sd: yup.string().nullable().label("SD"),
  pan: yup.string().nullable().label("Pan"),
  description: yup.string().nullable().label("Description"),
  quantity: yup.number().required().label("Quantity").positive(),
  price: yup.number().required().label("Price").positive(),
});

export type TInvoiceItemType = yup.InferType<typeof invoiceItemSchema>;

export const initialItemValue: TInvoiceItemType = {
  length: 0,
  shoulder: 0,
  hand: 0,
  handLoose: 0,
  neck: 0,
  loose: 0,
  centreLoose: 0,
  bottom: 0,
  open: 0,
  button: "",
  design: "",
  pocket: "P2",
  sewing: "Chap",
  sd: "SD",
  pan: "NO_PAN",
  description: "",
  quantity: 1,
  price: 0,
};



export const invoicesCreateUpdateSchema = yup.object({
  customerId: yup.mixed().required().label("Customer is Required"),
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
