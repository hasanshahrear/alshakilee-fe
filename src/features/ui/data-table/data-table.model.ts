import { DataTableValue } from "primereact/datatable";

export type TDataTableRes = {
  type: string;
  status: number;
  message: string;
  description: string;
  data: Data;
};

export type Data = {
  data: DataTableValue[];
  meta: Meta;
};

export type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
