import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

type TProps = {
  id?: number;
};

export function CustomerTypeCreateUpdateForm({ id }: TProps) {
  return (
    <Form className="flex flex-col gap-5">
      <FormikTextField
        name="name"
        label="Customer Name"
        className="p-inputtext-sm"
        requiredIcon="*"
      />
      <FormikTextField
        name="mobile"
        label="Mobile No"
        className="p-inputtext-sm"
        requiredIcon="*"
        keyfilter="pint"
      />
      <FormikSubmitButton className="flex justify-center">
        {id ? "Update" : "Save"}
      </FormikSubmitButton>
    </Form>
  );
}
