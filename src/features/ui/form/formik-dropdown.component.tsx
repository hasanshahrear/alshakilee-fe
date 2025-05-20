import { cn } from "@/features/utils";
import { useField } from "formik";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { useId } from "react";

type TOption = {
  name: string;
  value: string | number;
};

type TFormikDropdownProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
  options: TOption[];
} & DropdownProps;

export function FormikDropdown({
  name,
  label,
  requiredIcon,
  helperText,
  className,
  ...rest
}: TFormikDropdownProps) {
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
        <Dropdown
          {...inputProps}
          id={inputId}
          options={inputProps.options}
          className={cn("flex h-10 w-full items-center", className)}
          optionLabel="name"
          optionValue="value"
        />
      </div>

      {meta?.error && meta?.touched && (
        <small className="text-red-600">{meta?.error}</small>
      )}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
