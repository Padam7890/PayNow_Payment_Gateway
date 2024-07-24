"use client"

import { useSelectedLayoutSegments } from "next/navigation";
import Notification from "../../../components/Notification";
import { SocketProvider } from "../../contexts/SocketContent";
import { useSession } from "next-auth/react";
import NotificationHandler from "../../../components/NotificationHandler";



export default function() {
    const { data: session } = useSession();
          
    return <div>

      {session?.user && <NotificationHandler />}

    </div>
}