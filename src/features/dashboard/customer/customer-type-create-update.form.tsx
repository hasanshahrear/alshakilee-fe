import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

type TProps = {
  id?: number;
};

export function CustomerTypeCreateUpdateForm({ id }: Readonly<TProps>) {
  return (
    <Form className="flex flex-col gap-5">
      <FormikTextField
        name="mobile"
        label="Mobile No"
        placeholder="Enter Mobile No"
        className="p-inputtext-sm"
        requiredIcon="*"
        keyfilter="pint"
      />
      <div className="flex w-full justify-end">
        <FormikSubmitButton className="flex h-12 w-fit items-end justify-center border-none bg-primary">
          {id ? "Update" : "Save"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
