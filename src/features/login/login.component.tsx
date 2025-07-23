"use client";

import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginForm } from "./login.form.component";
import { initialValue, loginSchema, TLoginType } from "./form.config";

export function Login() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const handleSubmit = async (values: TLoginType) => {
    try {
      const result = await signIn("credentials", {
        phone: values?.phone,
        password: values?.password,
        redirect: false,
      });

      if (result?.ok) {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.warn("Something went wrong. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <LoginForm />
    </Formik>
  );
}
