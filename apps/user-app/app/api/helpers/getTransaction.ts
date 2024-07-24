import prisma from "@repo/db/client";

export const getTransactions = async (userId: number, days: number = 7) => {
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: userId,
      timestamp: { gte: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000) },
    },
    include: {
      fromUser: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return transactions;
};
