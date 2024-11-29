import * as yup from "yup";

export const buttomCreateUpdateSchema = yup.object({
  name: yup.string().required().min(2).max(50),
});

export type TButtomCreateUpdateType = yup.InferType<
  typeof buttomCreateUpdateSchema
>;

export const initailValue: TButtomCreateUpdateType = {
  name: "",
};
