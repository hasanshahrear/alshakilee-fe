import { cn } from "@/features/utils";
import { useField } from "formik";
import { Calendar, CalendarProps } from "primereact/calendar";
import { useId } from "react";

type TFormikDateProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
} & CalendarProps;

export function FormikDateField({
  name,
  className,
  helperText,
  label,
  requiredIcon,
  ...rest
}: TFormikDateProps) {
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
        <Calendar
          {...inputProps}
          id={inputId}
          className={cn("w-full", className)}
        />
      </div>

      {meta?.error && <small className="text-red-600">{meta?.error}</small>}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
