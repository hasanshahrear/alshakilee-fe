import * as yup from "yup";

export const customerCreateUpdateSchema = yup.object({
  mobile: yup
    .string()
    .required()
    .min(10, "Mobile No must be at least 10 characters")
    .max(15, "Mobile No must be at most 15 characters")
    .label("Mobile No"),
});

export type TCustomerCreateUpdateType = yup.InferType<
  typeof customerCreateUpdateSchema
>;

export const initailValue: TCustomerCreateUpdateType = {
  mobile: "",
};
