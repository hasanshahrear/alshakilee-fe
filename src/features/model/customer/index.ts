export type TGetCustomerTypeByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TCustomerTypeData;
};

export type TCustomerTypeData = {
  id: number;
  name: string;
  isActive: boolean;
};
