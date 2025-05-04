import { FormikSubmitButton, FormikTextField } from "@/features/ui";
import { Form } from "formik";

type TProps = {
  id?: number;
};

export function DesignTypeCreateUpdateForm({ id }: Readonly<TProps>) {
  return (
    <Form className="flex flex-col gap-5">
      <FormikTextField
        name="name"
        label="Design Name"
        placeholder="Enter Design Name"
        className="p-inputtext-sm"
        requiredIcon="*"
      />
     <div className="w-full flex justify-end">
     <FormikSubmitButton className="flex justify-center items-end bg-primary h-12 w-fit border-none">
        {id ? "Update" : "Save"}
      </FormikSubmitButton>
     </div>
    </Form>
  );
}
