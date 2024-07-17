
import express from 'express';

import db from "@repo/db/client";

const app = express();


app.get('/neplbankWebhook',async (req, res) => {
    const paymentInformation = {
        token:req.body.token,
        userId:req.body.user_indifier,
        amount:req.body.amount
    }
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
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