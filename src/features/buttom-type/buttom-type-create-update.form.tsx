import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

type TProps = {
  id?: number;
};

export function ButtomTypeCreateUpdateForm({ id }: TProps) {
  return (
    <Form className="flex flex-col gap-5">
      <FormikTextField
        name="name"
        label="Buttom Name"
        className="p-inputtext-sm"
        requiredIcon="*"
      />
      <FormikSubmitButton className="flex justify-center">
        {id ? "Update" : "Save"}
      </FormikSubmitButton>
    </Form>
  );
}
