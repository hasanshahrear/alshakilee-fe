"use client";

import { cn } from "@/features/utils";
import { useField } from "formik";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { useId } from "react";

type FormikTextFieldProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
} & InputTextareaProps;

export function FormikTextareaField({
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
            className="mb-1 block text-sm font-medium"
          >
            {label}
            {requiredIcon && (
              <span className="ml-1 text-red-600">{requiredIcon}</span>
            )}
          </label>
        )}
      </div>
      <div className="flex flex-row items-center">
        <InputTextarea
          id={inputId}
          {...inputProps}
          className={cn("w-full focus:border-primary focus:ring-0", className)}
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
