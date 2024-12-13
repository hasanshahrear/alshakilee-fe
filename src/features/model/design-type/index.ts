export type TGetDesignTypeByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TDesignTypeData;
};

export type TDesignTypeData = {
  id: number;
  name: string;
  isActive: boolean;
};
