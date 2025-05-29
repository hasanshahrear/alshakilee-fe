"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { TInvoiceItem } from "@/features/model";

type TInvoiceContextType = {
  selectedItems: TInvoiceItem[];
  setSelectedItems: Dispatch<SetStateAction<TInvoiceItem[]>>;
};

export const InvoiceContext = createContext<TInvoiceContextType>({
  selectedItems: [],
  setSelectedItems: () => {},
});

type TProps = {
  children: React.ReactNode;
};

export function SelectInvoiceProvider({ children }: TProps) {
  const [selectedItems, setSelectedItems] = useState<TInvoiceItem[]>([]);

  return (
    <InvoiceContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </InvoiceContext.Provider>
  );
}
