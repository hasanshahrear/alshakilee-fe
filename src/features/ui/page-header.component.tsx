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
        <h1 className="mb-1 text-base font-medium text-title md:mb-3 md:text-2xl">
          {title}
        </h1>
        <BreadCrumb
          model={breadCrumbJson}
          className="h-fit w-fit rounded-none border-none bg-transparent p-0 py-0.5"
          pt={{
            label: {
              className: "text-bodyText text-xs md:text-base",
            },
            separator: {
              className: "text-bodyText text-xs md:text-base",
            },
          }}
        />
      </div>
      <Button
        className="flex justify-center gap-2 rounded-[10px] border-none bg-primary px-4 text-xs font-medium md:h-12 md:px-6 md:text-base"
        size="small"
        onClick={buttonClick}
      >
        <CirclePlusIcon /> {buttonText}
      </Button>
    </div>
  );
}
