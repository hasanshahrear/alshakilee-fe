import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

type TProps = {
  id?: number;
};

export function DesignTypeCreateUpdateForm({ id }: TProps) {
  return (
    <Form className="flex flex-col gap-5">
      <FormikTextField
        name="name"
        label="Design Name"
        className="p-inputtext-sm"
        requiredIcon="*"
      />
      <FormikSubmitButton className="flex justify-center">
        {id ? "Update" : "Save"}
      </FormikSubmitButton>
    </Form>
  );
}
