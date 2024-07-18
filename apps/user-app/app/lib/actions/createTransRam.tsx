"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function createOnRamTransaction(amount: number, provider: string){
     const session = await getServerSession(authOptions);
     if(!session.user){
        return {
            message:"User not logged in"
        }
     }
     const token = (Math.random() * 1000).toString();

     const userId = session?.user?.id;

     await prisma.onRampTransaction.create({
        data:{
            userId: parseInt(userId),
            amount: amount * 100,
            provider: provider,
            status: "Processing",
            startTime: new Date(),
            token:token

        }
     })

     return {
        message: "Transaction created successfully",
        token: token
     }
     
     

}