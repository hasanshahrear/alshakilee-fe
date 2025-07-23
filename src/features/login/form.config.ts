import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup.string().required().label("Phone"),
  password: yup.string().required().label("Password"),
});

export type TLoginType = yup.InferType<typeof loginSchema>;

export const initialValue: TLoginType = {
  phone: "",
  password: "",
};
