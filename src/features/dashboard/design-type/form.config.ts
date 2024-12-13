import * as yup from "yup";

export const designCreateUpdateSchema = yup.object({
  name: yup.string().required().min(2).max(50).label("Buttom name"),
});

export type TDesignCreateUpdateType = yup.InferType<
  typeof designCreateUpdateSchema
>;

export const initailValue: TDesignCreateUpdateType = {
  name: "",
};
