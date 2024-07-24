"use client";

import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useFormik } from "formik";
import { object, string } from "yup";

interface Props {
  signIn: (provider: string, options: any) => Promise<any>;
  redirectLinks: { dashboard: () => void; signUp: () => void };
}
export default function SignInPage({signIn, redirectLinks}: Props) {
  const formik  = useFormik({
    initialValues: { phone: "", password: "" },
    validationSchema: object({
      phone: string().required("Phone Number is required").min(10, "Phone number must be 10"),
      password: string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        redirect: false,
        phone: values.phone,
        password: values.password,
      })
      if (result?.ok) {
        redirectLinks.dashboard();
        // alert("Success")
      } else {
        toast.error(result?.error)
      }
    }});


  return (
    <form  className="flex items-center justify-center h-screen" onSubmit={formik.handleSubmit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your phone number and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              placeholder="9861...."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone? (
              <div className="text-red-500 text-sm mt-2">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password? (
              <div className="text-red-500 text-sm mt-2">{formik.errors.password}</div>
            ) : null}
          </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </CardFooter>
        <div className="mt-4 text-center mb-4 text-sm">
          Don&apos;t have an account?{" "}
          <div  onClick={redirectLinks.signUp} className="underline cursor-pointer">
            Sign up
          </div>
        </div>
      </Card>
    </form>
  );
}
