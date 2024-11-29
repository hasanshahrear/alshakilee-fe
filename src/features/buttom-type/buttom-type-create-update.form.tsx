import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

export function ButtomTypeCreateUpdateForm() {
  return (
    <Form>
      <FormikTextField
        name="name"
        label="Buttom Name"
        className="p-inputtext-sm"
      />
      <FormikSubmitButton>Save</FormikSubmitButton>
    </Form>
  );
}
