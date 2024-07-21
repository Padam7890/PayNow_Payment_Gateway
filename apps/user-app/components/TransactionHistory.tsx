'use client'

import React, { useState } from 'react';

interface Transaction {
  fromUser: {
    name?: string;
    number?: string;
  };
  notes: string;
  timestamp: Date;
  amount: number;
}

interface TransactionHistoryProps {
  getTransaction: Transaction[];
  recentTransation: Transaction[];
  
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ getTransaction, recentTransation}) => {
    const [transactions, setTransactions] = useState<Transaction[]>(getTransaction);

    const handleSelectChanges = (event:React.ChangeEvent<HTMLSelectElement>)=>{
      if(event.target.value  === "recent"){
        console.log(recentTransation)
        setTransactions(recentTransation);

      }
      else{
        const allTransactions = getTransaction;
        setTransactions(allTransactions);
      }
    }
    const handleDownload = async () => {
        try {
            const response = await fetch('/api/helpers');
            if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'transactions.csv');
          document.body.appendChild(link);
          link.click();

          if (link.parentNode) {
          link.parentNode.removeChild(link);

      }      
      window.URL.revokeObjectURL(url); // Clean up the URL object

      } catch (error) {
        alert("Error downloading file")
          console.error('Error downloading CSV:', error);
        }
      };

  return (
    <div className="w-full">
      <div className="mx-auto mt-8 w-full px-2">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">Latest Payments</p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <label htmlFor="" className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900">
                  Sort by:
                </label>

                <select
                 onChange={handleSelectChanges}
                  name=""
                  className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                >
                  <option value="all" className="whitespace-no-wrap text-sm">All</option>
                  <option value="recent"  className="whitespace-no-wrap text-sm">Recent</option>
                </select>

              </div>

              <button
              onClick={handleDownload}
                type="button"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    className=""
                  ></path>
                </svg>
                Export to CSV
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td
                  width="50%"
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  Received From
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Notes
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Date
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Amount
                </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {transactions.map((transaction, index) => (
                <tr key={index} className="">
                  <td
                    width="50%"
                    className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                  >
                    Received from {transaction.fromUser.name || transaction.fromUser.number}
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">{transaction.timestamp.toDateString()}</p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {transaction.notes}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {transaction.timestamp.toDateString()}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {transaction.amount.toFixed(2)} NPR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
