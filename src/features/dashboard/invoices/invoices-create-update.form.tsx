import { Api, QueryKey, useGet } from "@/features/api";
import { CirclePlusIcon } from "@/features/icons";
import { TGetAllCustomer } from "@/features/model";
import {
  FormikDateField,
  FormikDropdown,
  FormikSubmitButton
} from "@/features/ui";
import { Form } from "formik";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useState } from "react";
import { InvoiceArray } from "./invoice-array.component";

export function InvoicesCreateUpdateForm() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: dataCustomerList } = useGet<TGetAllCustomer>({
    url: Api.Customer,
    queryKey: QueryKey.GetAllCustomer,
    queryParams: {
      status: true,
    },
  });

  const customerSearch = (e: AutoCompleteCompleteEvent) => {
    console.log(e.query);
    setSearchQuery(e.query);
  };

  const searchData: { name: string; code: string }[] =
    dataCustomerList?.data?.data?.map((x) => ({
      name: x?.name,
      code: String(x?.id),
    })) as [];

  console.log({ searchData });

  return (
    <Form className="flex flex-col gap-5 bg-white p-5 rounded-md shadow-md">
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-2">
          <FormikDropdown
            name="customerId"
            label="Customer Name"
            className="p-inputtext-sm"
            requiredIcon="*"
            options={
              dataCustomerList?.data?.data?.map((x) => ({
                ...x,
                name: `${x?.name} (${x?.mobile})`,
                value: x?.id,
              })) as []
            }
            filter
          />
        
        </div>

        <div className="col-span-2">
          <FormikDateField
            name="deliveryDate"
            label="Delivery Date"
            className="p-inputtext-sm"
            requiredIcon="*"
          />
        </div>
      </div>

      <InvoiceArray />

      <div className="w-full flex justify-end">
        <FormikSubmitButton  className="border-none bg-primary h-12 rounded-[10px] font-medium text-base px-6 flex gap-2 justify-center">
          <CirclePlusIcon /> Create Invoice
        </FormikSubmitButton>
     </div>
    </Form>
  );
}
