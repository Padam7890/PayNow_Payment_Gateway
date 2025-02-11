
import express from 'express';

import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true,
}));

app.post('/neplbankWebhook',async (req, res) => {
    const paymentInformation = {
        token:req.body.token,
        userId:req.body.user_indifier,
        amount:req.body.amount
    }

    // for example you can use the following code
  const result =   await db.onRampTransaction.findFirst({
        where: {
            token: paymentInformation.token
        }
    })
    if(result){
        return res.status(409).json({
            message: "Transaction is already processing"
        })
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured Payment "
        })
    } catch(e) {
        
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});