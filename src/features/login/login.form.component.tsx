import { Form } from "formik";
import { FormikSubmitButton, FormikTextField } from "@/features/ui";

export function LoginForm({ error }: { error: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div>
          {error && (
            <div className="mb-4 text-center text-red-600">
              Invalid phone or password. Please try again.
            </div>
          )}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form className="flex flex-col gap-5">
          <FormikTextField
            name="phone"
            label="Phone"
            className="p-inputtext-sm"
            requiredIcon="*"
          />
          <FormikTextField
            name="password"
            type="password"
            label="Password"
            className="p-inputtext-sm"
            requiredIcon="*"
          />
          <div className="flex w-full justify-end">
            <FormikSubmitButton className="flex h-12 w-fit items-end justify-center border-none bg-primary">
              Login
            </FormikSubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
