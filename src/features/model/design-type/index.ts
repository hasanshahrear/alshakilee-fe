import { TPageMeta } from "../common";

export type TGetDesignTypeByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TDesignTypeData;
};

export type TGetAllDesignType = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TDesignTypeList;
};

export type TDesignTypeList = {
  data: TDesignTypeData[];
  meta: TPageMeta;
};

export type TDesignTypeData = {
  id: number;
  name: string;
  isActive: boolean;
};
