"use client"

import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
  } from "lucide-react"
  
import { Badge } from "../../components/ui/badge"
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { notificationReduc } from '../../../app/(dashboard)/config/notification'


const Sidebar = ({ menuItems }:any) => {
  const pathname = usePathname();
  const notificationCount = notificationReduc();
  return (
    <div>
      {menuItems.map((menu:any, index:number) => {
        const isActive = pathname === menu.href

        return (
          <Link
            key={index}
            href={menu.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive ? 'bg-primary text-white' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            {menu.icon}
            {menu.title}
            {menu.isNotification && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {
                  notificationCount > 0 && notificationCount > 99
                   ? '99+'
                    : notificationCount

                  // Replace with actual notification count
                }
              </Badge>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
