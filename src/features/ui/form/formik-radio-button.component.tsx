import { useField } from "formik";
import { RadioButton, RadioButtonProps } from "primereact/radiobutton";

type TOption = {
  name: string;
  value: string | number | boolean;
};

type TFormikRadioButtonProps = {
  name: string;
  label?: string;
  requiredIcon?: string;
  helperText?: string;
  className?: string;
  options: TOption[];
} & RadioButtonProps;

export function FormikRadioButton({
  name,
  label,
  requiredIcon,
  helperText,
  options,
  ...rest
}: TFormikRadioButtonProps) {
  const [field, meta] = useField(name);
  const inputProps = { ...rest, ...field };

  return (
    <div>
      <div className="flex">
        {label && (
          <p className="mb-[2px] block text-sm font-medium">
            {label}
            {requiredIcon && (
              <span className="ml-1 text-red-600">{requiredIcon}</span>
            )}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {options?.map((x, i) => (
          <div
            key={i}
            className="flex"
          >
            <RadioButton
              {...inputProps}
              value={x?.value}
              inputId={String(x?.value + name)}
              checked={field?.value === x?.value}
              pt={{
                root: {
                  className: "h-4 w-4",
                },
                input: {
                  className: "h-4 w-4",
                },
                box: {
                  className: "h-4 w-4",
                },
              }}
            />
            <label
              htmlFor={String(x?.value + name)}
              className="pl-1 text-sm"
            >
              {x?.name}
            </label>
          </div>
        ))}
      </div>

      {meta?.error && <small className="text-red-600">{meta?.error}</small>}
      {helperText && !meta?.error && <small>{helperText}</small>}
    </div>
  );
}
