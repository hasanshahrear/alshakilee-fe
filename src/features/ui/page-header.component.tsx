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
    <div className="flex flex-row items-center justify-between gap-4">
      <div>
        <h1 className="mb-3 text-2xl font-medium text-title">{title}</h1>
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
        className="flex h-12 justify-center gap-2 rounded-[10px] border-none bg-primary px-6 text-base font-medium"
        size="small"
        onClick={buttonClick}
      >
        <CirclePlusIcon /> {buttonText}
      </Button>
    </div>
  );
}
