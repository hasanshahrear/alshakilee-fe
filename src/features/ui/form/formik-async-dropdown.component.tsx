import { cn } from "@/features/utils";
import { useField } from "formik";
import { AutoComplete, AutoCompleteProps } from "primereact/autocomplete";
import { useId } from "react";

type TFormikDropdownProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
} & AutoCompleteProps;

export function FormikAsyncDropdown({
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
        <AutoComplete
          {...inputProps}
          id={inputId}
          className={cn("w-full", className)}
        />
      </div>

      {meta?.error && meta?.touched && (
        <small className="text-red-600">{meta?.error}</small>
      )}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
