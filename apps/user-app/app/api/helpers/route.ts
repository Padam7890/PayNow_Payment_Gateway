
import prisma from "@repo/db/client";
import { createObjectCsvWriter } from "csv-writer";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from 'fs';


export async function GET() {
    try {
      const transactions = await prisma.p2pTransfer.findMany({
        include: {
          fromUser: true,
        },
      });
  
      const filePath = path.resolve('transactions.csv');
  
      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
          { id: 'id', title: 'ID' },
          { id: 'fromUser', title: 'From User' },
          { id: 'toUserId', title: 'To User ID' },
          { id: 'amount', title: 'Amount' },
          { id: 'timestamp', title: 'Timestamp' },
          { id: 'notes', title: 'Notes' },
        ],
      });
  
      const records = transactions.map(transaction => ({
        id: transaction.id,
        fromUser: transaction.fromUser.name || transaction.fromUser.number,
        toUserId: transaction.toUserId,
        amount: transaction.amount,
        timestamp: transaction.timestamp,
        notes: transaction.notes,
      }));
  
      await csvWriter.writeRecords(records);
  
      const fileStream:any = fs.createReadStream(filePath);
  
      return new NextResponse(fileStream, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=transactions.csv',
        },
      });
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      return new NextResponse('Error fetching data from the database.', { status: 500 });
    }
  }
  