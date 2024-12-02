"use client";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa6";

type TProps = {
  breadCrumbJson: any;
  title: string;
  buttonText: string;
  buttonClick: () => void;
};

export function PageHeader({
  breadCrumbJson,
  title,
  buttonText,
  buttonClick,
}: TProps) {
  return (
    <div className="flex flex-col gap-4">
      <BreadCrumb
        model={breadCrumbJson}
        className="h-fit w-fit rounded-none border-none bg-transparent p-0 py-0.5"
        pt={{
          label: {
            className: "text-purple-800",
          },
          separator: {
            className: "text-purple-800",
          },
        }}
      />
      <div className="flex items-center justify-between rounded-lg border bg-purple-800 p-3 pl-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>
        <Button
          className="border-none bg-white text-purple-800"
          size="small"
          onClick={buttonClick}
        >
          <FaPlus className="mr-2" /> {buttonText}
        </Button>
      </div>
    </div>
  );
}
