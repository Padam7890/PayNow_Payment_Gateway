import { NextRequest, NextResponse } from "next/server";
import { getNotifications, markNotificationAsRead } from "../../lib/actions/notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"; // Ensure you have this import if authOptions is defined in this file
  
// Function to handle marking notifications as read
export async function PUT(req: NextRequest) {
  try {
    const { notificationIds } = await req.json();
    const updatedNotifications = await markNotificationAsRead(notificationIds);
    return NextResponse.json(updatedNotifications);
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 });
  }
}

// Function to handle fetching notifications
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const notifications = await getNotifications(session.user.id);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}
