"use client";

import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import AsyncCreatableSelect, {
  AsyncCreatableProps as AsyncCreatableSelectProps,
} from "react-select/async-creatable";
import type { GroupBase } from "react-select";
import { cn, highlightMatch } from "@/features/utils";
import { Skeleton } from "primereact/skeleton";

type TOption = {
  label: string;
  value: string | number;
};

type TFormikAsyncCreatableDropdownProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
  loadOptions: AsyncCreatableSelectProps<
    TOption,
    false,
    GroupBase<TOption>
  >["loadOptions"];
} & Omit<
  AsyncCreatableSelectProps<TOption, false, GroupBase<TOption>>,
  "loadOptions"
>;

export type CustomerInfo = {
  id: number;
  mobile: string;
  name: string;
};

type FormValues = {
  customerInfo?: CustomerInfo;
};

export function FormikAsyncCreatableDropdown({
  name,
  label,
  requiredIcon,
  helperText,
  className,
  loadOptions,
  ...rest
}: TFormikAsyncCreatableDropdownProps) {
  const { values } = useFormikContext<FormValues>();
  const [mounted, setMounted] = useState<boolean>(false);
  const [, meta, helpers] = useField(name);
  const [value, setValue] = useState<TOption | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (values?.customerInfo) {
      setValue({
        label: String(
          `${values?.customerInfo?.mobile} - ${values?.customerInfo?.name}`,
        ),
        value: Number(values?.customerInfo?.id),
      });
    }
  }, [values?.customerInfo]);

  if (!mounted)
    return (
      <>
        <Skeleton
          width="100%"
          height="20px"
          className="mb-2"
        ></Skeleton>
        <Skeleton
          width="100%"
          height="40px"
          className=""
        ></Skeleton>
      </>
    );

  const handleChange = (selected: TOption | null) => {
    setValue(selected as TOption);
    if (selected !== null) {
      helpers.setValue(selected?.value);
      return;
    }
    helpers.setValue(0);
  };

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium">
          {label}
          {requiredIcon && (
            <span className="ml-1 text-red-600">{requiredIcon}</span>
          )}
        </label>
      )}

      <AsyncCreatableSelect
        loadOptions={loadOptions}
        onChange={handleChange}
        value={value}
        classNamePrefix="react-select"
        className={cn("h-10 w-full", className)}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            height: "40px",
          }),
        }}
        formatOptionLabel={(option, { inputValue }) => (
          <div>{highlightMatch(option.label, inputValue)}</div>
        )}
        {...rest}
      />

      {meta.touched && meta.error ? (
        <small className="text-red-600">{meta.error}</small>
      ) : (
        helperText && <small>{helperText}</small>
      )}
    </div>
  );
}
