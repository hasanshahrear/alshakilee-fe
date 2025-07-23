import * as yup from "yup";

export const invoiceItemSchema = yup.object({
  id: yup.number().nullable(),
  length: yup.string().required().label("Length"),
  shoulder: yup.number().required().label("Shoulder").positive(),
  hand: yup.number().required().label("Hand").positive(),
  handLoose: yup.string().required().label("Hand Loose"),
  neck: yup.number().required().label("Neck").positive(),
  chestLoose: yup.number().required().label("Chest Loose").positive(),
  centreLoose: yup.string().required().label("Centre Loose").min(1),
  downLoose: yup.number().required().label("Bottom").positive(),
  open: yup.number().required().label("Open").positive(),
  button: yup.string().required().label("Button"),
  design: yup.string().required().label("Design"),
  pocket: yup.string().required().label("Pocket"),
  sewing: yup.string().required().label("Sewing"),
  sd: yup.string().nullable().label("SD"),
  pan: yup.string().nullable().label("Pan"),
  description: yup.string().nullable().label("Description"),
  quantity: yup.number().required().label("Quantity").positive(),
  fabric: yup.string().notRequired().label("Fabric"),
  name: yup.string().notRequired().label("Name"),
  phul: yup.string().notRequired().label("Phul"),
  price: yup.number().required().label("Price").positive(),
});

export type TInvoiceItemType = yup.InferType<typeof invoiceItemSchema>;

export const initialItemValue: TInvoiceItemType = {
  id: 0,
  length: "",
  shoulder: 0,
  hand: 0,
  handLoose: "",
  neck: 0,
  chestLoose: 0,
  centreLoose: "",
  downLoose: 0,
  open: 0,
  button: "",
  design: "",
  pocket: "P2_BAG",
  sewing: "LOCK",
  sd: "SD",
  pan: "NO_PAN",
  description: "",
  quantity: 1,
  fabric: "",
  name: "",
  phul: "",
  price: 0,
};

export const invoicesCreateUpdateSchema = yup.object({
  id: yup.number().nonNullable(),
  customerId: yup
    .number()
    .required()
    .label("Select Customer")
    .positive("Select Customer"),
  deliveryDate: yup.date().required().label("Delivery Date"),
  totalPrice: yup.number().notRequired().label("Total Price"),
  advanceAmount: yup.number().notRequired().label("Advance Amount"),
  discountAmount: yup.number().notRequired().label("Discount Amount"),
  status: yup.number().notRequired(),
  items: yup.array().of(invoiceItemSchema).min(1),
});

export type TInvoicesCreateUpdateType = yup.InferType<
  typeof invoicesCreateUpdateSchema
>;

export const initailValue: TInvoicesCreateUpdateType = {
  id: 0,
  customerId: 0,
  deliveryDate: new Date(),
  totalPrice: 0,
  advanceAmount: 0,
  discountAmount: 0,
  status: 1,
  items: [initialItemValue],
};
