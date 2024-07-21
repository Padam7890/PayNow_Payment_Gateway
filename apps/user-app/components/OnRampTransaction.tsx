import { Card } from "@repo/ui/card"
import { useEffect } from "react";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    
    const statusStyles:Record<string, string> = {
        "Processing": "text-gray-500",
        "Success": "text-green-500",
        "Failure": "text-red-500"
      };
    return <Card title="Recent Transactions">

        <div className="pt-2">
            {transactions.map(t => <div className="flex flex-col gap-2 lg:flex-row lg:gap-0 justify-between shadow-md p-4">
                <div>
                    <div className="text-sm">
                        Received NPR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`text-sm ${statusStyles[t.status]}`}>
                    {
                        t.status
                    }

                </div>
              

                <div className="flex flex-col justify-center">
                    + Rs {t.amount}
                </div>

            </div>
        )}
        </div>
    </Card>
}