import { TPageMeta } from "../common";

export type TGetButtomTypeByID = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TButtomTypeData;
};

export type TGetAllButtomType = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: TButtomTypeList;
};

export type TButtomTypeList = {
  data: TButtomTypeData[];
  meta: TPageMeta;
};

export type TButtomTypeData = {
  id: number;
  name: string;
  isActive: boolean;
};
