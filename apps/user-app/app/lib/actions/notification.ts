
import db from "@repo/db/client";

export const getNotifications = async (userId:any)=>{
    const notifications = await db.notification.findMany({
        where:{
            userId:parseInt(userId),
        },
        orderBy:{
          createdAt: "desc"
        }
    })
   return notifications;
    
}


export const markNotificationAsRead = async (notificationId:any)=>{
   const notificationUpdate= await db.notification.updateMany({
    where: {
      id: {
        in: notificationId,
      },
    },
    data: {
      read: true,
    },
  });

    return notificationUpdate;
 
}

