import { Api, QueryKey, useGet } from "@/features/api";
import { TGetAllButtomType, TGetAllDesignType } from "@/features/model";
import {
  FormikDropdown,
  FormikRadioButton,
  FormikTextField,
} from "@/features/ui";
import { FieldArray, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { initialItemValue, TInvoicesCreateUpdateType } from "./form.config";

export function InvoiceArray() {
  const { values } = useFormikContext<TInvoicesCreateUpdateType>();
  const { data: dataButtomTypeList } = useGet<TGetAllButtomType>({
    url: Api.BottomType,
    queryKey: QueryKey.GetAllBottomType,
    queryParams: {
      status: true,
    },
  });
  const { data: dataDesignList } = useGet<TGetAllDesignType>({
    url: Api.DesignType,
    queryKey: QueryKey.GetAllDesignType,
    queryParams: {
      status: true,
    },
  });
  return (
    <FieldArray
      name="items"
      render={({ push, remove }) => (
        <>
          {values?.items?.map((_, i) => (
            <div
              className="relative"
              key={i}
            >
              <div
                className="grid grid-cols-7 gap-4 rounded-lg bg-gray-100 p-4"
                key={i}
              >
                <FormikTextField
                  name={`items[${i}].quantity`}
                  type="number"
                  keyfilter="pint"
                  label="Quantity"
                  className="p-inputtext-sm"
                />
                <FormikTextField
                  name={`items[${i}].length`}
                  type="number"
                  keyfilter="pnum"
                  label="Length"
                  className="p-inputtext-sm"
                />
                <FormikTextField
                  name={`items[${i}].shoulder`}
                  type="number"
                  keyfilter="pnum"
                  label="Shoulder"
                  className="p-inputtext-sm"
                />
                <FormikTextField
                  name={`items[${i}].hand`}
                  type="number"
                  keyfilter="pnum"
                  label="Hand"
                  className="p-inputtext-sm"
                />
                <FormikTextField
                  name={`items[${i}].handLouse`}
                  type="number"
                  keyfilter="pnum"
                  label="Hand Louse"
                  className="p-inputtext-sm"
                />
                <FormikTextField
                  name={`items[${i}].neck`}
                  type="number"
                  keyfilter="pnum"
                  label="Neck"
                  className="p-inputtext-sm"
                />
                <FormikTextField
                  name={`items[${i}].neckLouse`}
                  type="number"
                  keyfilter="pnum"
                  label="Neck Louse"
                  className="p-inputtext-sm"
                />{" "}
                <FormikTextField
                  name={`items[${i}].centreLouse`}
                  type="number"
                  keyfilter="pnum"
                  label="Centre Louse"
                  className="p-inputtext-sm"
                />
                <FormikDropdown
                  name={`items[${i}].bottomTypeId`}
                  label="Buttom Type"
                  className="p-inputtext-sm"
                  requiredIcon="*"
                  options={
                    dataButtomTypeList?.data?.data?.map((x) => ({
                      ...x,
                      name: x?.name,
                      value: x?.id,
                    })) as []
                  }
                  filter
                />
                <FormikDropdown
                  name={`items[${i}].designTypeId`}
                  label="Design Type"
                  className="p-inputtext-sm"
                  requiredIcon="*"
                  options={
                    dataDesignList?.data?.data?.map((x) => ({
                      ...x,
                      name: x?.name,
                      value: x?.id,
                    })) as []
                  }
                  filter
                />
                <FormikRadioButton
                  name={`items[${i}].pocketStyle`}
                  label="PocketStyle"
                  requiredIcon="*"
                  options={[
                    { name: "P2", value: "P2" },
                    { name: "P2 Bag", value: "P2_Bag" },
                  ]}
                  className="p-inputtext-sm"
                />
                <FormikRadioButton
                  name={`items[${i}].sewingType`}
                  label="Sewing Type"
                  requiredIcon="*"
                  options={[
                    { name: "Chap", value: "Chap" },
                    { name: "Lock", value: "Lock" },
                  ]}
                  className="p-inputtext-sm"
                />
                <FormikRadioButton
                  name={`items[${i}].sdType`}
                  label="SD Type"
                  requiredIcon="*"
                  options={[
                    { name: "SD", value: "SD" },
                    { name: "No SD", value: "No_SD" },
                  ]}
                  className="p-inputtext-sm"
                />
              </div>
              {values?.items && values?.items?.length > 1 && (
                <Button
                  type="button"
                  icon={<MdClose className="text-2xl" />}
                  severity="danger"
                  onClick={() => remove(i)}
                  className="absolute bottom-2 right-2 p-2"
                  size="small"
                  rounded 
                  aria-label="Cancel"
                />
              )}
            </div>
          ))}
          <div className="mx-auto">
            <Button
              type="button"
              label="Add More Size"
              className="h-10 bg-primary border-none rounded-full font-medium"
              icon={<AiOutlinePlus size="20" className="mr-2" />}
              onClick={() => push(initialItemValue)}
              pt={{
                label: {
                  className: "font-normal",
                }
              }}
            />
          </div>
        </>
      )}
    />
  );
}
