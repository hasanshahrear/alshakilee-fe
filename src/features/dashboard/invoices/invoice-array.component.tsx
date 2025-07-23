import {
  FormikRadioButton,
  FormikTextareaField,
  FormikTextField,
} from "@/features/ui";
import { FieldArray, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { initialItemValue, TInvoicesCreateUpdateType } from "./form.config";
import { useEffect } from "react";

export function InvoiceArray() {
  const { values } = useFormikContext<TInvoicesCreateUpdateType>();

  return (
    <FieldArray
      name="items"
      render={({ push, remove }) => (
        <div className="grid grid-cols-1 gap-2 md:mb-20 xl:mb-10 xl:grid-cols-2">
          {values?.items?.map((_, i) => (
            <div
              className="relative"
              key={i}
            >
              <p className="mb-2 rounded bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <span className="hidden md:inline-block">Invoice No:</span>{" "}
                {i + 1}
              </p>
              <div
                className="grid grid-cols-12 items-start gap-2 rounded-lg bg-[#f9f9f9] p-2 xxl:p-5"
                key={i}
              >
                <div className="col-span-6">
                  <FormikTextField
                    name={`items[${i}].name`}
                    type="text"
                    label="Name"
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="col-span-6">
                  <FormikTextField
                    name={`items[${i}].quantity`}
                    type="number"
                    label="Quantity"
                    className="p-inputtext-sm text-right"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].length`}
                    type="text"
                    label="Length"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].shoulder`}
                    type="number"
                    keyfilter="pnum"
                    label="Shoulder"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].hand`}
                    type="number"
                    keyfilter="pnum"
                    label="Hand"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].handLoose`}
                    type="text"
                    label="HandLoose"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].neck`}
                    type="number"
                    keyfilter="pnum"
                    label="Neck"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].chestLoose`}
                    type="number"
                    keyfilter="pnum"
                    label="Chest Loose"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].centreLoose`}
                    type="text"
                    label="CentreLoose"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].downLoose`}
                    type="number"
                    keyfilter="pnum"
                    label="DownLoose"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].open`}
                    type="number"
                    keyfilter="pnum"
                    label="Open"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikTextField
                    name={`items[${i}].button`}
                    type="text"
                    label="Button"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6">
                  <FormikTextField
                    name={`items[${i}].phul`}
                    type="text"
                    label="Phul"
                    className="p-inputtext-sm"
                    requiredIcon=""
                  />
                </div>
                <div className="col-span-12">
                  <FormikTextField
                    name={`items[${i}].design`}
                    type="text"
                    label="Design"
                    className="p-inputtext-sm"
                    requiredIcon="*"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikRadioButton
                    name={`items[${i}].sd`}
                    label="SD"
                    requiredIcon="*"
                    options={[
                      { name: "SD", value: "SD" },
                      { name: "No SD", value: "NO_SD" },
                      { name: "KT", value: "KT" },
                    ]}
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikRadioButton
                    name={`items[${i}].pan`}
                    label="Pan"
                    requiredIcon="*"
                    options={[
                      { name: "No Pan", value: "NO_PAN" },
                      { name: "Pan", value: "PAN" },
                    ]}
                    className="p-inputtext-sm text-xs"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikRadioButton
                    name={`items[${i}].sewing`}
                    label="Sewing"
                    requiredIcon="*"
                    options={[
                      { name: "Lock", value: "LOCK" },
                      { name: "Chap", value: "CHAP" },
                    ]}
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <FormikRadioButton
                    name={`items[${i}].pocket`}
                    label="Pocket"
                    requiredIcon="*"
                    options={[
                      { name: "P2 Bag", value: "P2_BAG" },
                      { name: "P2 Adi", value: "P2_ADI" },
                    ]}
                    className="p-inputtext-sm"
                  />
                </div>
                <div className="col-span-12">
                  <FormikTextareaField
                    name={`items[${i}].description`}
                    label="Description"
                    className="h-[112px] w-full"
                    rows={3}
                  />
                </div>
                <div className="col-span-12">
                  <FormikTextField
                    name={`items[${i}].fabric`}
                    type="text"
                    label="Fabric"
                    className="p-inputtext-sm"
                  />
                </div>
              </div>
              {values?.items && values?.items?.length > 1 && (
                <Button
                  type="button"
                  icon={<MdClose className="mr-2 text-base" />}
                  severity="danger"
                  onClick={() => remove(i)}
                  className="absolute right-28 top-1 h-7 px-4"
                  size="small"
                  label="Remove"
                  rounded
                  aria-label="Cancel"
                />
              )}
              <Button
                type="button"
                icon={<AiOutlinePlus className="mr-2 text-base" />}
                onClick={() => push(initialItemValue)}
                className="absolute right-2 top-1 h-7 px-4"
                size="small"
                label="Add"
                rounded
                aria-label="Add"
              />
            </div>
          ))}
        </div>
      )}
    />
  );
}
