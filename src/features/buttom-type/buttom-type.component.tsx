import { Api, QueryKey } from "@/features/api";
import { CustomDataTable } from "@/features/ui/data-table";
import { BreadCrumb } from "primereact/breadcrumb";
import { bottomTypeBreadcrumb } from "./data";

export function ButtomType() {
  return (
    <div className="flex flex-col gap-6">
      <BreadCrumb
        model={bottomTypeBreadcrumb}
        className="w-fit border-none p-0"
      />
      <div className="">
        <div className="rounded-sm">
          <h1>Bottom Type</h1>
        </div>
        <CustomDataTable
          url={Api.BottomType}
          queryKey={QueryKey.GetAllBottomType}
          columns={[
            { field: "name", header: "Name" },
            {
              field: "isActive",
              header: "Active/Inactive",
            },
          ]}
        />
      </div>
    </div>
  );
}
