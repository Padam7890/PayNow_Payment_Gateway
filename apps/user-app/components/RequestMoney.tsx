"use client";

import { Card as MainCard } from "@repo/ui/card";
import React from "react";
import { Card } from "../shadeUI/components/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../shadeUI/components/ui/tabs";

const RequestMoney = () => {
  const formik = useFormik({
    initialValues: {
      amount: "",
      phone: "",
      messages: "",
    },
    validationSchema: object({
      amount: number()
        .required("Amount is required")
        .min(1, "Amount should be at least 1")
        .max(1000000, "Amount should not exceed 1,000,000"),
      phone: number().required("Phone number is required"),
      messages: string().required("Message is required"),
    }),
    onSubmit: (values) => {
      // Your form submission logic goes here
      console.log(values);
    },
  });

  return (
    <div className=" w-full">
      <MainCard className="" title="Request Money">
        <div className=" flex w-full mt-3 gap-10 flex-wrap ">
          <Card className="w-full xl:w-1/3 flex px-6 ">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <TextInput
                label="Amount"
                placeholder="Amount"
                onChange={formik.handleChange}
                name="amount"
                value={formik.values.amount}
              />

              {formik.touched.amount && formik.errors.amount ? (
                <div className="text-red-500  text-xs mt-1">
                  {formik.errors.amount}
                </div>
              ) : null}
              <div className="mt-5">
                <TextInput
                  label="Request From"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  name="phone"
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div className="mt-5">
                <TextInput
                  label="Messages"
                  placeholder="Message"
                  onChange={formik.handleChange}
                  name="messages"
                  value={formik.values.messages}
                />
                {formik.touched.messages && formik.errors.messages ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.messages}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-center pt-4 mt-3">
                <Button type="submit">
                  Request Money
                  {/* {loading ? "Loading Money" : "Add Money"} */}
                </Button>
              </div>
            </form>
          </Card>

          <Card className="w-fit flex-1">
            <div className="w-full">
              <Tabs defaultValue="send-requests" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="send-requests"> Send request</TabsTrigger>
                  <TabsTrigger value="received-requests">
                    Received Request
                  </TabsTrigger>
                  <TabsTrigger value="request-history">
                    Request History
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="send-requests">
                  <div className="">
                    <ul className=" flex flex-col gap-2">
                      <li className=" py-1 px-3 flex justify-between items-center cursor-pointer border-b-2">
                        Please Send me Rs 500 in my Account Please
                        {/* <div>
                         Amount
                       </div>
                       <div>
                        <Button className=" bg-red-500 hover:bg-red-700 ">Accept</Button>
                        <Button className=" bg-green-500 hover:bg-green-700 ">Accept</Button>
                       </div> */}
                      </li>
                      <li className=" py-1 px-3 flex justify-between items-center cursor-pointer border-b-2">
                        Please Send me Rs 500 in my Account Please
                        {/* <div>
                         Amount
                       </div>
                       <div>
                        <Button className=" bg-red-500 hover:bg-red-700 ">Accept</Button>
                        <Button className=" bg-green-500 hover:bg-green-700 ">Accept</Button>
                       </div> */}
                      </li>{" "}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="received-requests">
                  hey Received request here
                </TabsContent>
                <TabsContent value="request-history">
                  hey Request History here
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>
      </MainCard>
    </div>
  );
};

export default RequestMoney;
