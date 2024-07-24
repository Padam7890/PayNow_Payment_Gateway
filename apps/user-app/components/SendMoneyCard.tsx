"use client";
import { useFormik } from 'formik';
import React from 'react';
import { number, object, string } from 'yup';
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Button } from '@repo/ui/button';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { getSession, useSession } from 'next-auth/react';
import { authOptions } from '../app/lib/auth';

const SendMoneyCard = () => {
  const [socket, setSocket] = React.useState<any>(null);
  const [userId, setUserId] = React.useState<any>(null);
  const session = useSession();

  React.useEffect(() => {
    const socketIo = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnectionAttempts: 5
    });


    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);



  const formik = useFormik({
    initialValues: {
      phone: '',
      amountToSend: 0,
      note: '',
    },
    validationSchema: object({
      phone: number().required('Recipient Phone Number is required').positive().min(10, "Phone number must be 10"),
      amountToSend: number().required('Amount to send is required').min(1, 'Amount must be at least 1').positive(),
      note: string().required('Note is required').min(10, 'Note must be at least 10 characters long'),
    }),
    onSubmit: async (values) => {
      console.log('Form values:', values);
      try {
        const response = await fetch('/api/transfer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (response.ok) {
          if (socket) {
            socket.emit('send_money', {
              fromUserId: session?.data?.user?.id, // Replace with actual user ID
              toUserId: result.toUserId,
              amount: values.amountToSend,
              notes: values.note,
              timestamp: new Date().toISOString(),
            });

            toast.info(result.message);
          } else {
            throw new Error('Socket connection not established');
          }
        } else {
          throw new Error(result.message || 'Transfer failed');
        }
      } catch (error: any) {
        toast.error(error.message || 'An error occurred.');
      }
    }
  });

  return (
    <div>
      <form action="" className='max-w-sm mx-auto mt-10' onSubmit={formik.handleSubmit}>
        <Center>
          <Card title='Send Money To Another Account'>
            <div className='mb-5 mt-4'>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient Phone Number</label>
              <input type="tel"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="983121..." />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm mt-2">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className='mb-5 mt-4'>
              <label htmlFor="amountToSend" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Amount</label>
              <input type="number"
                onChange={formik.handleChange}
                value={formik.values.amountToSend}
                onBlur={formik.handleBlur}
                id="amountToSend" name='amountToSend' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1200..." />
              {formik.touched.amountToSend && formik.errors.amountToSend ? (
                <div className="text-red-500 text-sm mt-2">{formik.errors.amountToSend}</div>
              ) : null}
            </div>

            <div className='mb-5 mt-4'>
              <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Note</label>
              <input type="text"
                onChange={formik.handleChange}
                value={formik.values.note}
                onBlur={formik.handleBlur}
                id="note" name='note' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enjoy..." />
              {formik.touched.note && formik.errors.note ? (
                <div className="text-red-500 text-sm mt-2">{formik.errors.note}</div>
              ) : null}
            </div>

            <div className='mb-5 mt-4'>
              <Button type='submit'>
                Send
              </Button>
            </div>
          </Card>
        </Center>
      </form>
    </div>
  );
};

export default SendMoneyCard;
