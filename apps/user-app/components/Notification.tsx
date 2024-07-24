import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const NotificationList = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/notifications/${session.user.id}`);
          const result = await response.json();
          if (response.ok) {
            setNotifications(result);
          } else {
            console.error('Failed to fetch notifications:', result.message);
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, [session]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.fromUserId} sent you {notification.amount} with note: "{notification.notes}" at {new Date(notification.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
