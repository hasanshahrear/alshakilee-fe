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
  isActive: boolean;
  customer: TCustomer;
  invoiceItems: TInvoiceItem[];
};

export type TCustomer = {
  id: number;
  mobile: string;
  isActive: boolean;
};

export type TInvoiceItem = {
  id: number;
  length: number;
  shoulder: number;
  hand: number;
  handLoose: number;
  neck: number;
  loose: number;
  centreLoose: number;
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
  price: number;
  isActive: boolean;
  invoiceId: number;
  createdAt: Date;
  updatedAt: Date;
};
