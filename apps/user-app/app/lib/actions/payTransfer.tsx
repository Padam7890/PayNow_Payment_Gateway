"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { User } from "@prisma/client";
import { userAgent } from "next/server";

export async function p2pTransfer(to: string, amount: number, note: string) {
    try {

        const sendMoney = await transferMoney(amount,to,note);
        if (sendMoney?.success) {
            return {
                success: true,
                message: "Transfer successful."
            };
        }

    } catch (error:any) {
        console.error("Error during p2p transfer:", error);
        return {
            success: false,
            message: error.message || "An error occurred while processing the transfer."
        };
    }
}


export async function transferMoney (amount:number , to:string, note:string) {
   try {
       const user = await checkUserIsAuth(to);
       const userId = user.data?.toUser.id;
       const from = user.data?.from;
      //check if user is same person to sending the money
      const findNumber = await prisma.user.findFirst({
          where: { id: userId}
      })

      if (findNumber?.number === userId) {
          return {
              success: false,
              message: "You cannot transfer money to yourself."
          };
      }

      // Find the sender's balance record
      const fromBalance = await prisma.balance.findUnique({
          where: { userId: from }
      });

      // Check if the sender has a balance record
      if (!fromBalance) {
          console.log(`No balance record found for user ${userId}.`);
          return {
              success: false,
              message: "Balance record not found for sender."
          };
      }

      // Find or create the recipient's balance record
      await prisma.balance.upsert({
          where: { userId: userId},
          update: {},  // No update needed if record exists
          create: {
              userId: Number(userId),
              amount: 0,  // Initial balance
              locked: 0   // Initial locked amount
          }
      });
  
        if (!fromBalance || fromBalance.amount < amount) {
          return {
              success: false,
              message: "Insufficent Balance."
          };
        }


      // Proceed with the transaction
      await prisma.$transaction(async (tx) => {
          await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
  
            await tx.balance.update({
              where: { userId: Number(from) },
              data: { amount: { decrement: amount } },
            });
  
            await tx.balance.update({
              where: { userId: userId },
              data: { amount: { increment: amount } },
            });
  
            await tx.p2pTransfer.create({
              data: {
                  fromUserId: Number(from),
                  toUserId: Number(userId),
                  amount,
                  notes: note,
                  timestamp: new Date()
              }
            })
      });
    
   } catch (error) {
     console.error("Error during money transfer:", error);
     throw error;
    
   }
}

export async function checkUserIsAuth(to:string) {
     const session = await getServerSession(authOptions);
     const from = session?.user?.id;

     if (!from) {
         console.log("User not authenticated.");
         return {
             success: false,
             message: "User not authenticated. Cannot process the transfer."
         };
     }

     const toUser = await prisma.user.findFirst({
         where: { number: to }
     });

     if (!toUser) {
         console.log(`Recipient user with number ${to} not found.`);
         return {
             success: false,
             message: "Recipient user not found."
         };
     }
     return {
         success: true,
         data: {
             from,
             toUser
         }
     };
}