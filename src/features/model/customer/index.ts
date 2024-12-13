import { TPageMeta } from "../common";

export type TGetCustomerTypeByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TCustomerData;
};

export type TGetAllCustomer = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TCustomerList;
};

export type TCustomerList = {
  data: TCustomerData[];
  meta: TPageMeta;
};

export type TCustomerData = {
  id: number;
  name: string;
  mobile: string;
  isActive: boolean;
};
