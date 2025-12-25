import * as yup from "yup";

export const userCreateSchema = yup.object({
  phone: yup.string().required().label("Phone"),
  password: yup.string().min(8, "Password min 8 char").required(),
  name: yup.string().required().label("Name"),
  role: yup.string().required(),
  employeeTypeId: yup.number().optional(),
  isActive: yup.boolean().default(false),
});

export const userUpdateSchema = yup.object({
  phone: yup.string().required().label("Phone"),
  password: yup.string().min(8, "Password min 8 char").optional(),
  name: yup.string().required().label("Name"),
  role: yup.string().required(),
  employeeTypeId: yup.number().optional(),
  isActive: yup.boolean().default(false),
});

export type TUserUpdateType = yup.InferType<typeof userUpdateSchema>;

export type TUserCreateType = yup.InferType<typeof userCreateSchema>;

export const initialValue: TUserCreateType = {
  phone: "",
  password: "",
  name: "",
  role: "EMPLOYEE",
  employeeTypeId: undefined,
  isActive: false,
};
