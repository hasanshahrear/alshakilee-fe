"use client";

import { CirclePlusIcon } from "@/features/icons";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";

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
}: Readonly<TProps>) {
  return (
    <div className="flex flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-medium text-title mb-3">{title}</h1>
        <BreadCrumb
          model={breadCrumbJson}
          className="h-fit w-fit rounded-none border-none bg-transparent p-0 py-0.5"
          pt={{
            label: {
              className: "text-bodyText",
            },
            separator: {
              className: "text-bodyText",
            },
          }}
        />
      </div>
       <Button
          className="border-none bg-primary h-12 rounded-[10px] font-medium text-base px-6 flex gap-2 justify-center"
          size="small"
          onClick={buttonClick}
        >
          <CirclePlusIcon /> {buttonText}
        </Button>
      
    </div>
  );
}
