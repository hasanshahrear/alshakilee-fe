"use client";

import { Form, FormikContextType } from "formik";
import {
  FormikCancelButton,
  FormikDropdown,
  FormikRadioButton,
  FormikSubmitButton,
  FormikTextField,
} from "@/features/ui/form";
import { Api, QueryKey, useGet } from "@/features/api";

type TProps = {
  id?: number;
};

export function UserCreateUpdateForm({ id }: TProps) {
  const { data: dataEmployeeType } = useGet<TGetEmployeeListRes>({
    url: Api.EmployeeType,
    queryKey: QueryKey.GetAllEmployeeType,
    queryParams: { status: true, limit: 20 },
  });

  return (
    <Form className="flex flex-col gap-4">
      <FormikTextField
        label="Name"
        name="name"
        placeholder="Enter name"
      />
      <FormikTextField
        label="Phone"
        name="phone"
        placeholder="Enter phone"
      />
      <FormikTextField
        label="Password"
        name="password"
        placeholder="Enter password"
      />
      <FormikDropdown
        label="Employee Type"
        name="employeeTypeId"
        options={
          dataEmployeeType?.data?.data?.map((item) => ({
            name: item.name,
            value: item.id,
          })) || []
        }
      />
      <FormikDropdown
        label="Role"
        name="role"
        options={[
          {
            name: "EMPLOYEE",
            value: "EMPLOYEE",
          },
          {
            name: "ADMIN",
            value: "ADMIN",
          },
        ]}
      />
      <FormikRadioButton
        label="Status"
        name="isActive"
        options={[
          { name: "Active", value: true },
          { name: "Inactive", value: false },
        ]}
      />
      <div className="flex w-full justify-end">
        <FormikSubmitButton className="flex h-12 w-fit items-end justify-center border-none bg-primary">
          {id ? "Update" : "Save"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
}
