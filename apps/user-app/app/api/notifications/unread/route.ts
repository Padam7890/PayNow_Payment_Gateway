// pages/api/notifications/unread.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
  try {
    const id = session.user.id
    const notifications = await db.notification.count({
      where: {
        userId: parseInt(id),
        read: false, // Assuming there's a 'read' field to track if a notification is read
      },
    })
    return NextResponse.json({ count: notifications });
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    return NextResponse.json({ error: "Failed to fetch unread notifications" }, { status: 500 });
  }
}
