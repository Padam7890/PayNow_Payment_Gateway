import React from "react";
import NotificationList from "../../../components/NotificationList";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getNotifications } from "../../lib/actions/notification";

const page = async () => {
  const session = await getServerSession(authOptions);

  const userId = parseInt(session?.user?.id);
  const notificationList: any = await getNotifications(userId);
  return (
    <div>
      <NotificationList notificationLists={notificationList} />
    </div>
  );
};

export default page;
