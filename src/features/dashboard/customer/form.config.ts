import * as yup from "yup";

export const customerCreateUpdateSchema = yup.object({
  name: yup.string().required().min(2).max(50).label("Customer Name"),
});

export type TCustomerCreateUpdateType = yup.InferType<
  typeof customerCreateUpdateSchema
>;

export const initailValue: TCustomerCreateUpdateType = {
  name: "",
};
