"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Power } from "lucide-react"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"

export function AppHeader() {
    const { state, toggleSidebar } = useSidebar()
    const { user, logout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      <div className="flex items-center gap-2">
         {/* Custom Sidebar Trigger with Chevron */}
     
        <Separator orientation="vertical" className="mr-2 h-4" />
        
        {/* Logo and Company Name - Using text based on image since I don't have the logo asset */}
        <div className="hidden md:flex flex-col">
            <h1 className="text-sm font-bold text-blue-900 leading-tight">Work Store</h1>
            {/* <p className="text-[10px] text-gray-500">A Govt. of India (Ministry of Railways) Enterprise</p> */}
        </div>
      </div>
      
      {/* Center Title */}
      <div className="flex-1 flex justify-center">
        {/* <h2 className="text-xl font-bold text-blue-600">e-अतिथि / Visitor Mangement</h2> */}
      </div>

      {/* Right Side - User Profile */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
            {user && (
                <p className="text-sm font-bold text-gray-700">{user.name.toUpperCase()}</p>
            )}
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500" onClick={logout}>
            <Power className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
