"use client";  // Ensure this is a client component

import React from 'react';
import Link from "next/link";
import { Bell, Package2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useRouter } from 'next/router';

interface Props{
  logoName: string;
  notificationUrl: string; 

}

const SidebarHeader = ({ logoName, notificationUrl }: Props) => {
  // Access the notification count from Redux store
  const notificationCount = useSelector((state: RootState) => state.socketNotifications.count);
 const notificationLink = ()=>{
  const router = useRouter();
  router.push(notificationUrl); // Navigate to the notification page

 }
  return (
    <div className="relative flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span>{logoName}</span>
      </Link>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8 relative">
        <Bell onClick={()=>notificationLink()}  className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
          <div className="absolute -top-3 -right-2 flex h-5 w-5 items-center justify-center border  rounded-full bg-white shadow-md text-red-900 text-xs font-semibold">
          {
                  notificationCount > 0 && notificationCount > 99
                   ? '99+'
                    : notificationCount
                }          </div>
        
      </Button>
    </div>
  );
};

export default SidebarHeader;
