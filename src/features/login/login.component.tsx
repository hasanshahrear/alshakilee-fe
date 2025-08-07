"use client";

import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginForm } from "./login.form.component";
import { initialValue, loginSchema, TLoginType } from "./form.config";
import { toast } from "sonner";

export function Login() {
  const { status } = useSession();
  const router = useRouter();

  const [error, setError] = useState<boolean>(false);

  const url = "/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      router.push(url);
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
        toast.success("Login successful!");
        // router.push(url);
        window.location.href = url;
      } else {
        setError(true);
      }
    } catch (error) {
      console.warn("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        <LoginForm error={error} />
      </Formik>
    </>
  );
}
