type TInvoiceTrackingRes = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TInvoiceDataList;
};

type TInvoiceDataList = {
  data: TInvoiceData[];
  meta: TMeta;
};

type TInvoiceData = {
  id: number;
  invoiceId: number;
  userId: number;
  employeeTypeId: number;
  status: string;
  changedAt: Date;
  changedBy: null;
  invoice: TInvoice;
  user: TUser;
  employeeType: TEmployee;
};

type TInvoice = {
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
  priceDetails: string;
  customer: TCustomer;
  invoiceItems: TInvoiceItem[];
};

type TCustomer = {
  id: number;
  mobile: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
};

type TInvoiceItem = {
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
  fabric: string;
  name: string;
  phul: string;
  price: null;
  isActive: boolean;
  invoiceId: number;
  createdAt: Date;
  updatedAt: Date;
};

type TUser = {
  id: number;
  phone: string;
  password: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  employeeTypeId: number | null;
};

type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
