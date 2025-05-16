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
     <div className="w-full flex justify-end">
     <FormikSubmitButton className="flex justify-center items-end bg-primary h-12 w-fit border-none">
        {id ? "Update" : "Save"}
      </FormikSubmitButton>
     </div>
    </Form>
  );
}
