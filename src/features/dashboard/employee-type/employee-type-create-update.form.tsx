"use client";

import { FormikContextType } from "formik";
import {
  FormikCancelButton,
  FormikSubmitButton,
  FormikTextField,
} from "@/features/ui/form";

type TProps = {
  id?: number;
};

export function EmployeeTypeCreateUpdateForm({ id }: TProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormikTextField
        label="Name"
        name="name"
        placeholder="Enter employee type name"
      />
      <div className="flex w-full justify-end">
        <FormikSubmitButton className="flex h-12 w-fit items-end justify-center border-none bg-primary">
          {id ? "Update" : "Save"}
        </FormikSubmitButton>
      </div>
    </div>
  );
}
