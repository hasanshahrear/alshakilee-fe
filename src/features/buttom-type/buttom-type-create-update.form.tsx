import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

export function ButtomTypeCreateUpdateForm() {
  return (
    <Form className="flex flex-col gap-5">
      <FormikTextField
        name="name"
        label="Buttom Name"
        className="p-inputtext-sm"
        requiredIcon="*"
      />
      <FormikSubmitButton className="flex justify-center">
        Save
      </FormikSubmitButton>
    </Form>
  );
}
