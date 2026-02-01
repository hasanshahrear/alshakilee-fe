type TUsersRes = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TUserData;
};

type TUserData = {
  data: TUser[];
  meta: TMeta;
};

type TUser = {
  id: number;
  phone: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  employeeTypeId: number | null;
  employeeType: TEmployeeType | null;
};
