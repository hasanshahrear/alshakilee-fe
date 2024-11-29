"use client";

import { useField } from "formik";
import { InputText, InputTextProps } from "primereact/inputtext";
import { useId } from "react";

type FormikTextFieldProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
} & InputTextProps;

export function FormikTextField({
  name,
  label,
  helperText,
  requiredIcon,
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
          className="w-full"
          {...inputProps}
        />
      </div>

      {meta?.error && <small className="text-red-600">{meta?.error}</small>}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
