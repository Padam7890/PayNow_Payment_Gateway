"use client";

import React, { useEffect, useState } from 'react';
import { Card } from "@repo/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { fetchNotifications, markNotificationAsRead, markAllAsRead } from "../app/lib/services/notifications"; // Adjust the path as needed
import { useDispatch } from 'react-redux';
import { fetchUnreadCount } from '../redux/slices/socketNotificationSlice';
import { AppDispatch } from '../redux/store';

const NotificationList = ({ notificationLists }: any) => {
  const [notificationList, setNotificationList] = useState(notificationLists);
  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    const loadNotifications = async () => {
      const notifications = await fetchNotifications();
      setNotificationList(notifications);
    };
    loadNotifications();

  }, [notificationList]);

  const handleMarkNotificationAsRead = async (id: number) => {
    const success = await markNotificationAsRead(id);
    if (success) {
      setNotificationList(await fetchNotifications());
      dispatch(fetchUnreadCount())

    }
  };

  const handleMarkAllAsRead = async () => {
    const notificationIds = notificationList.map((notification: any) => notification.id);
    const success = await markAllAsRead(notificationIds);
    if (success) {
      setNotificationList(await fetchNotifications());
      dispatch(fetchUnreadCount())
    }
    
  };

  return (
    <div>
      <Card title="Notifications">
        <div className="px-5 pt-5">
          {notificationList?.map((notification: any, index: number) => (
            <div
              onClick={() => handleMarkNotificationAsRead(notification.id)}
              className={`flex items-center justify-between p-3  ${notification.read ? "": "bg-gray-100"} rounded-lg mb-2 border-b-[1px] cursor-pointer`}
              key={index}
            >
              <div className="flex flex-col gap-1 mb-3">
                <span className="font-bold text-sm">{notification.message}</span>
                <span className="text-xs text-gray-500">
                  {notification.createdAt && formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7v6a2 2 0 002 2h16a2 2 0 002-2V7l-10 5L12 2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-2">
          <div className="flex flex-col gap-1 mb-3 cursor-pointer" onClick={handleMarkAllAsRead}>
            <span className="font-bold text-sm">Mark all as Read</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationList;
