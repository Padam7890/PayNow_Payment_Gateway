"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { createOnRamTransaction } from "../app/lib/actions/createTransRam";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "@repo/ui/textinput";
import { toast } from "react-toastify";

const SUPPORTED_BANKS = [{
    name: "Np Bank",
    redirectUrl: "https://nepalbank.com.np/"
}, {
    name: "Hero Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is required").min(1, "Amount must be at least 1"),
    provider: Yup.string().required("Provider is required")
});


export const AddMoney = () => {
    const formik = useFormik({
        initialValues: {
            amount: "0",
            provider: SUPPORTED_BANKS[0]?.name || ""
        },
        validationSchema,
        onSubmit: async (values) => {
            const bank = SUPPORTED_BANKS.find(x => x.name === values.provider);
            try {
            const response= await createOnRamTransaction(values.amount, values.provider);
            toast.success(response?.message)
            // window.location.href = bank?.redirectUrl || "";
                
            } catch (error:any) {
                toast.error(error)
                // window.location.href = bank?.redirectUrl || "";
                
            }
            finally{
                formik.resetForm();
            }
            
        }
    });

    return (
        <Card title="Add Money">
            <form onSubmit={formik.handleSubmit} className="w-full">
                <TextInput
                    label="Amount"
                    placeholder="Amount"
                    onChange={formik.handleChange}
                    name="amount"
                    value={formik.values.amount}
                />
                {formik.touched.amount && formik.errors.amount ? (
                    <div className="text-red-500">{formik.errors.amount}</div>
                ) : null}

                <div className="py-4 text-left">
                    Bank
                </div>
                <Select
                    onSelect={(value) => formik.setFieldValue("provider", value)}
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))}
                />
                {formik.touched.provider && formik.errors.provider ? (
                    <div className="text-red-500">{formik.errors.provider}</div>
                ) : null}
                <div className="text-red-800 mt-3 text-sm">
                        Bank Name are for Testing Purposes only
                </div>

                <div className="flex justify-center pt-4">
                    <Button type="submit">
                        Add Money
                    </Button>
                </div>
            </form>
        </Card>
    );
};
