"use client";

import { Formik } from "formik";
import { ButtomTypeCreateUpdateForm } from "./buttom-type-create-update.form";
import {
  buttomCreateUpdateSchema,
  initailValue,
  TButtomCreateUpdateType,
} from "./form.config";

export function ButtomTypeCreateUpdate() {
  const handleSubmit = async (values: TButtomCreateUpdateType) => {
    console.log({ values });
  };
  return (
    <Formik
      initialValues={initailValue}
      validationSchema={buttomCreateUpdateSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <ButtomTypeCreateUpdateForm />
    </Formik>
  );
}
