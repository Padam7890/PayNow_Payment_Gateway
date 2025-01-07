"use client";

import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";

interface Props {
  redirectLinks: { dashboard: () => void; signin: () => void };
}

export default function SignupForm({ redirectLinks }: Props) {
  const formik = useFormik({
    initialValues: { 
        phone: "",
        password: "",
        confirmPassword: "",
        email: "",
        city: "",
        address: "",
        name: "",
     },
    validationSchema: object({
      phone: string().required("Phone Number is required").min(10, "Phone number must be 10 digits"),
      password: string().required("Password is required"),
      confirmPassword: string().required("Confirm Password is required").oneOf([ref('password')], "Passwords must match"),
      email: string().email("Invalid email address").required("Email Required"),
      city: string(),
      address: string(),
      name: string().required("Name is required"),

    }),
    onSubmit: async (values: any) => {
      try {
        const { phone, password, name, city, address, email } = values;
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone, password, name, city, address, email }),
        });
        const result = await response.json();
        if (response.ok) {
          redirectLinks.signin();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while signing up. Please try again later.");
      }
    },
  });

  return (
    <form className="flex items-center justify-center h-screen" onSubmit={formik.handleSubmit}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter Required <span className="text-red-500 font-bold">*</span> fields to create an account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name <span className="text-red-500 font-bold">*</span></Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.name)}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email <span className="text-red-500 font-bold">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.email)}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500 font-bold">*</span></Label>
            <Input
              id="phone"
              type="text"
              placeholder="9861...."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.phone)}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="New York"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.city)}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="123 Main St"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.address)}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password <span className="text-red-500 font-bold">*</span></Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.password)}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500 font-bold">*</span></Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-2">{String(formik.errors.confirmPassword)}</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </CardFooter>
        <div className="mt-4 text-center mb-4 text-sm">
          Already have an account?{" "}
          <div onClick={redirectLinks.signin} className="underline">
            Sign in
          </div>
        </div>
      </Card>
    </form>
  );
}
