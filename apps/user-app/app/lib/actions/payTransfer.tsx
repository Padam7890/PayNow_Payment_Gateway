"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number, note: string) {
    try {
        // Fetch the current session
        const session = await getServerSession(authOptions);
        const from = session?.user?.id;

        // Check if the user is authenticated
        if (!from) {
            console.log("User not authenticated.");
            return {
                success: false,
                message: "User not authenticated. Cannot process the transfer."
            };
        }

        // Find the recipient user
        const toUser = await prisma.user.findFirst({
            where: { number: to }
        });

        // Check if the recipient user exists
        if (!toUser) {
            console.log(`Recipient user with number ${to} not found.`);
            return {
                success: false,
                message: "Recipient user not found."
            };
        }
        //check if user is same person to sending the money
        const findNumber = await prisma.user.findFirst({
            where: { id: parseInt(from) }
        })

        if (findNumber?.number === toUser.number) {
            return {
                success: false,
                message: "You cannot transfer money to yourself."
            };
        }

        // Find the sender's balance record
        const fromBalance = await prisma.balance.findUnique({
            where: { userId: Number(from) }
        });

        // Check if the sender has a balance record
        if (!fromBalance) {
            console.log(`No balance record found for user ${from}.`);
            return {
                success: false,
                message: "Balance record not found for sender."
            };
        }

        // Find or create the recipient's balance record
        await prisma.balance.upsert({
            where: { userId: toUser.id },
            update: {},  // No update needed if record exists
            create: {
                userId: toUser.id,
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
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
              });
    
              await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    notes: note,
                    timestamp: new Date()
                }
              })
        });

        return {
            data:{
                fromUser: from,
                toUser: toUser.id,
                amount: amount,
                timestamp: new Date(),
                notes: note,
            },
            success: true,
            message: "Transfer completed successfully."
        };



    } catch (error:any) {
        console.error("Error during p2p transfer:", error);
        return {
            success: false,
            message: error.message || "An error occurred while processing the transfer."
        };
    }
}
