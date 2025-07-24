import { TInvoiceItemPriceType } from "@/features/dashboard/invoices/form.config";

export type TGetInvoiceByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TInvoiceData;
};

export type TInvoiceData = {
  id: number;
  invoiceNumber: string;
  customerId: number;
  invoiceDate: Date;
  deliveryDate: Date;
  totalQuantity: number;
  totalPrice: number;
  discountAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  status: number;
  customer: TCustomer;
  invoiceItems: TInvoiceItem[];
  priceDetails: string;
};

export type TCustomer = {
  id: number;
  mobile: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
};

export type TInvoiceItem = {
  id: number;
  length: string;
  shoulder: number;
  hand: number;
  handLoose: string;
  neck: number;
  chestLoose: number;
  centreLoose: string;
  downLoose: number;
  open: number;
  button: string;
  design: string;
  pocket: string;
  sewing: string;
  sd: string;
  pan: string;
  description: string;
  quantity: number;
  name?: string;
  fabric?: string;
  isActive: boolean;
  invoiceId: number;
  createdAt: Date;
  updatedAt: Date;
  phul: string;
  price: number;
};
