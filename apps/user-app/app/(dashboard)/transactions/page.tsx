
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import TransactionHistory from "../../../components/TransactionHistory";
import { json } from "node:stream/consumers";
import { getTransactions } from "../../lib/actions/getTransaction";

export default async function () {

const session = await getServerSession(authOptions);

const userId = parseInt(session.user.id);
const transactions:any = await getTransactions(userId);
const recentTransactions:any = await getTransactions(userId, 7);

   return (
    <>
    <TransactionHistory getTransaction={transactions} recentTransation= {recentTransactions}/>
    </>
   )
}