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
  status: number;
  customer: TCustomer;
  totalPrice: number;
  advanceAmount: number;
  discountAmount: number;
  invoiceItems: TInvoiceItem[];
};

export type TCustomer = {
  id: number;
  mobile: string;
  isActive: boolean;
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
};
