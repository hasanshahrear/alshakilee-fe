import { Api, QueryKey, useGet } from "@/features/api";
import { TGetAllCustomer } from "@/features/model";
import {
  FormikAsyncDropdown,
  FormikDateField,
  FormikDropdown,
  FormikSubmitButton,
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
    <Form className="flex flex-col gap-5">
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
          <FormikAsyncDropdown
            name="customerId"
            label="Customer Name"
            className="p-inputtext-sm"
            requiredIcon="*"
            suggestions={searchData}
            completeMethod={customerSearch}
            // value={}
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

      <FormikSubmitButton className="flex justify-center">
        Save
      </FormikSubmitButton>
    </Form>
  );
}
