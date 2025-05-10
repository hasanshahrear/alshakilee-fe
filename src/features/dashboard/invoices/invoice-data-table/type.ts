import { DataTableValue } from "primereact/datatable";

// export type TInvoiceItem = {
//   id: number;
//   description: string;
//   length: number;
//   hand: number;
//   quantity: number;
//   price: number;
// } extends DataTableValue;

export type TInvoice = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  deliveryDate: string;
  customerId: number;
  isActive: boolean;
  customer: {
    id: number;
    mobile: string;
    isActive: boolean;
  };
  invoiceItems: DataTableValue[];
};

export type TDataTableRes = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: {
    data: TInvoice[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};
