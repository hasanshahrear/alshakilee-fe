export type TGetButtomTypeByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TButtomTypeData;
};

export type TButtomTypeData = {
  id: number;
  name: string;
  isActive: boolean;
};
