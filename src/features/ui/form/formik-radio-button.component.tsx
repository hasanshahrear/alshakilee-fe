import { useField } from "formik";
import { RadioButton, RadioButtonProps } from "primereact/radiobutton";

type TOption = {
  name: string;
  value: string | number;
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
  className,
  options,
  ...rest
}: TFormikRadioButtonProps) {
  const [field, meta] = useField(name);
  const inputProps = { ...rest, ...field };

  return (
    <div>
      <div className="flex">
        {label && (
          <p className="mb-2 block text-sm font-medium">
            {label}
            {requiredIcon && (
              <span className="ml-1 text-red-600">{requiredIcon}</span>
            )}
          </p>
        )}
      </div>
      <div className="flex flex-row items-center gap-3">
        {options?.map((x, i) => (
          <div
            key={i}
            className="flex items-center"
          >
            <RadioButton
              {...inputProps}
              value={x?.value}
              inputId={String(x?.value + name)}
              checked={field?.value === x?.value}
            />
            <label
              htmlFor={String(x?.value + name)}
              className="pl-2"
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
