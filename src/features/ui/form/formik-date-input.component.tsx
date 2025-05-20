import { cn } from "@/features/utils";
import { useField } from "formik";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useId, useState } from "react";

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
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
          className={cn("h-10 w-full", className)}
        />
      </div>

      {meta?.error && <small className="text-red-600">{meta?.error}</small>}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
