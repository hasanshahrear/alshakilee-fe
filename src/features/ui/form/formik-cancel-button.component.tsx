"use client";

import { useFormikContext } from "formik";
import { Button, ButtonProps } from "primereact/button";

export function FormikCancelButton({ children, ...rest }: ButtonProps) {
  const formik = useFormikContext();
  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <Button
      onClick={handleCancel}
      outlined
      severity={rest?.severity ?? "secondary"}
      {...rest}
    >
      {children}
    </Button>
  );
}
