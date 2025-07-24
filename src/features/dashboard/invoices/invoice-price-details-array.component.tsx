import { FieldArray, useFormikContext } from "formik";
import { TInvoicesCreateUpdateType } from "./form.config";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FormikTextField } from "@/features/ui";
import { useEffect } from "react";

export function InvoicePriceDetailsArray() {
  const { values, setFieldValue } =
    useFormikContext<TInvoicesCreateUpdateType>();

  useEffect(() => {
    const totalPrice = values?.priceDetails?.reduce(
      (acc, item) => acc + Number(item?.quantity) * Number(item?.price),
      0,
    );

    if (totalPrice && totalPrice > 0) {
      setFieldValue("totalPrice", totalPrice);
    }
  }, [values?.priceDetails]);

  return (
    <FieldArray
      name="priceDetails"
      render={({ push, remove }) => (
        <>
          <table className="w-full border-collapse border">
            {values?.priceDetails && values?.priceDetails?.length > 0 ? (
              <thead>
                <tr className="border-b">
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Price</th>
                  <th className="px-2 text-right">Subtotal</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
            ) : null}
            <tbody>
              {values?.priceDetails?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="text-left">
                    <FormikTextField
                      name={`priceDetails.${index}.quantity`}
                      type="number"
                      className="p-inputtext-sm"
                      requiredIcon="*"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="text-right">
                    <FormikTextField
                      name={`priceDetails.${index}.price`}
                      type="number"
                      className="p-inputtext-sm"
                      requiredIcon="*"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="px-2 text-right">
                    {(Number(item?.quantity) * Number(item?.price)).toFixed(3)}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => remove(index)}
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))}
              {values?.priceDetails?.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center text-gray-500"
                  >
                    No price details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-blue-500 px-3 py-0.5 text-white hover:bg-blue-600"
              onClick={() => push({ quantity: 1, price: 0 })}
            >
              <AiOutlinePlus /> Add Price Detail
            </button>
          </div>
        </>
      )}
    />
  );
}
