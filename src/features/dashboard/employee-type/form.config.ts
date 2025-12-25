import * as yup from "yup";

export const employeeTypeCreateUpdateSchema = yup.object({
  name: yup.string().required().label("Name"),
});

export type TEmployeeTypeCreateUpdateType = yup.InferType<
  typeof employeeTypeCreateUpdateSchema
>;

export const initialValue: TEmployeeTypeCreateUpdateType = {
  name: "",
};
