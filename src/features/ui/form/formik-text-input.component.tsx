"use client";

import { cn } from "@/features/utils";
import { useField } from "formik";
import { InputText, InputTextProps } from "primereact/inputtext";
import { useId } from "react";

type FormikTextFieldProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
} & InputTextProps;

export function FormikTextField({
  name,
  label,
  helperText,
  requiredIcon,
  className,
  ...rest
}: FormikTextFieldProps) {
  const inputId = useId();
  const [field, meta] = useField(name);
  const inputProps = { ...rest, ...field };

  return (
    <div>
      <div className="flex">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium"
          >
            {label}
            {requiredIcon && (
              <span className="ml-1 text-red-600">{requiredIcon}</span>
            )}
          </label>
        )}
      </div>
      <div className="flex flex-row items-center">
        <InputText
          id={inputId}
          type={inputProps?.type ?? "text"}
          {...inputProps}
          className={cn("w-full h-10 focus:border-primary focus:ring-0", className)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      {meta?.error && meta?.touched && (
        <small className="text-red-600">{meta?.error}</small>
      )}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
