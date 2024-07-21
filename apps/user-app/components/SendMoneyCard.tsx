
"use client"
import { useFormik } from 'formik'
import React from 'react'
import { number, object, string } from 'yup'
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Button } from '@repo/ui/button';
import ReCAPTCHA from "react-google-recaptcha";
import { p2pTransfer } from '../app/lib/actions/payTransfer';
import { toast } from 'react-toastify';

const SendMoneyCard = () => {
    const recaptchaRef:any = React.createRef();


const formik = useFormik({
    initialValues:{
        phone: '',
        amountToSend: 0,
        note:'',
        // recaptcha: ""
    },
    validationSchema: object({
        phone: number().required('Recipient Phone Number is required').positive().min(10, "phone number must be 10"),
        amountToSend: number().required('Amount to send is required').min(1, 'Amount must be at least 1').positive(),
        note: string().required('Note is required').min(10, 'Note must be at least 10 characters long'),
        // recaptcha: string().required('Please verify that you are not a robot')
    }),
    onSubmit:async (values) => {
         // Send values to your server
         console.log(values)
         try {
            const res = await p2pTransfer(values.phone, values.amountToSend, values.note);
             toast.info(res.message)
         } catch (error:any) {
            toast.error(error)
         }
    }
})


  return (


    <div>
        <form action="" className='max-w-sm mx-auto mt-10' onSubmit={formik.handleSubmit}>
             <Center>
                <Card title='Send Money To another Account'>
                   <div className='mb-5 mt-4'>
                   <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient Phone Number</label>
                   <input type="tel"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="983121..."  />
                     {formik.touched.phone && formik.errors.phone? (
                     <div className="text-red-500 text-sm mt-2">{formik.errors.phone}</div>
                   ) : null}
                   </div>
                   <div className='mb-5 mt-4'>
                   <label htmlFor="amountToSend" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Amount</label>
                   <input type="number"
                    onChange={formik.handleChange}
                    value={formik.values.amountToSend}
                    onBlur={formik.handleBlur}
                    id="amountToSend" name='amountToSend' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1200..."  />
                     {formik.touched.amountToSend && formik.errors.amountToSend? (
                     <div className="text-red-500 text-sm mt-2">{formik.errors.amountToSend}</div>
                   ) : null}
                   </div>

                   <div className='mb-5 mt-4'>
                   <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Note</label>
                   <input type="text"
                    onChange={formik.handleChange}
                    value={formik.values.note}
                    onBlur={formik.handleBlur}
                    id="note" name='note' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enjoy..."  />
                     {formik.touched.note && formik.errors.note? (
                     <div className="text-red-500 text-sm mt-2">{formik.errors.note}</div>
                   ) : null}
                   </div>

                   {/* <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc8ohQqAAAAAA3N3TbAUk2UH-RwPc0cw2GyvI0u"
                onChange={(value) => {
                  console.log("$$$$", formik.isSubmitting, value);
                  formik.setFieldValue("recaptcha", value);
                  formik.setSubmitting(false);
                }}
              />
              {
                formik.touched.recaptcha && formik.errors.recaptcha ? (
                    <div className="text-red-500 text-sm mt-2">{formik.errors.recaptcha}</div>
                  ) : null
                
              } */}



                   <div className='mb-5 mt-4'>

                      <Button type='submit'>
                            Send
                      </Button>
                   </div>
                  
                  
                </Card>

             </Center>

        </form>
    </div>
  )
}

export default SendMoneyCard