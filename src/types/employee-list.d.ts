type TGetEmployeeListRes = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TGetEmployeeListData;
};

type TGetEmployeeListData = {
  data: TEmployee[];
  meta: Meta;
};

type TEmployee = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
