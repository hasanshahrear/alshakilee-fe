"use client";

import { useFormikContext } from "formik";
import { Button, ButtonProps } from "primereact/button";
import { CgSpinner } from "react-icons/cg";

export function FormikSubmitButton({
  type,
  disabled,
  ...rest
}: Readonly<ButtonProps>) {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      type={type ?? "submit"}
      disabled={disabled || isSubmitting}
      loading={isSubmitting ?? false}
      loadingIcon={<CgSpinner className="icon-spin mr-1" />}
      {...rest}
    />
  );
}
