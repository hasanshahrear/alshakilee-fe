import { TInvoiceItemType } from "../form.config";

export type TInvoice = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  deliveryDate: string;
  customerId: number;
  isActive: boolean;
  totalPrice?: number;
  advanceAmount?: number;
  discountAmount?: number;
  balanceAmount?: number;
  totalQuantity?: number;
  customer: {
    id: number;
    mobile: string;
    name?: string;
    isActive: boolean;
  };
  invoiceItems: TInvoiceItemType[];
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
