// Fetch notifications from the server
export const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch notifications');
      return res.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  // Mark a single notification as read
  export const markNotificationAsRead = async (id: number) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds: [id] }),
      });
      if (!res.ok) throw new Error('Failed to mark notification as read');
      return res.json();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error; // Rethrow to allow higher-level handling if necessary
    }
  };
  
  // Mark all notifications as read
  export const markAllAsRead = async (notificationIds: number[]) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds }),
      });
      if (!res.ok) throw new Error('Failed to mark all notifications as read');
      return res.json();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error; // Rethrow to allow higher-level handling if necessary
    }
  };
  