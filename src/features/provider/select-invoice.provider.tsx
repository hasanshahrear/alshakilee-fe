"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TCustomer, TInvoiceItem } from "@/features/model";
import { CustomerInfo } from "../ui/form/formik-async-creatable-dropdown.component";

type TInvoiceContextType = {
  selectedItems: TInvoiceItem[];
  setSelectedItems: Dispatch<SetStateAction<TInvoiceItem[]>>;
  customerId: number;
  setCustomerId: Dispatch<SetStateAction<number>>;
  customerInfo: CustomerInfo;
  setCustomerInfo: Dispatch<SetStateAction<CustomerInfo>>;
};

export const InvoiceContext = createContext<TInvoiceContextType>({
  selectedItems: [],
  setSelectedItems: () => {},
  customerId: 0,
  setCustomerId: () => {},
  customerInfo: {} as CustomerInfo,
  setCustomerInfo: () => {},
});

type TProps = {
  children: React.ReactNode;
};

export function SelectInvoiceProvider({ children }: TProps) {
  const [selectedItems, setSelectedItems] = useState<TInvoiceItem[]>([]);
  const [customerId, setCustomerId] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(
    {} as CustomerInfo,
  );

  return (
    <InvoiceContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        customerId,
        setCustomerId,
        customerInfo,
        setCustomerInfo,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
