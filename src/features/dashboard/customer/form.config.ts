import * as yup from "yup";

export const customerCreateUpdateSchema = yup.object({
  name: yup.string().required().label("Name"),
  mobile: yup
    .string()
    .required()
    .min(8, "Mobile No must be at least 10 characters")
    .max(15, "Mobile No must be at most 15 characters")
    .label("Mobile No"),
});

export type TCustomerCreateUpdateType = yup.InferType<
  typeof customerCreateUpdateSchema
>;

export const initialValue: TCustomerCreateUpdateType = {
  name: "",
  mobile: "",
};
