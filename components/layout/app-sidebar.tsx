"use client"

import * as React from "react"
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  FileText,
  LayoutDashboard,
  LogOut,
  Users,
  Video,
  List,
  ShieldAlert,
  Settings,
  Layers
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { useAuth } from "@/hooks/useAuth"


// Base menu items
const baseNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Videos",
    url: "/videos",
    icon: Video,
  },
]

const adminNavItems = [
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Video Management",
    url: "/admin/videos",
    icon: List,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Layers,
  },
  {
    title: "Roles",
    url: "/admin/roles",
    icon: ShieldAlert,
  },
]

const managerNavItems = [
  {
    title: "Video Management",
    url: "/admin/videos",
    icon: List,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Layers,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { toggleSidebar, state } = useSidebar()
  const { logout, user } = useAuth();

  const navItems = [...baseNavItems];
  
  if (user?.role === "admin") {
    navItems.push(...adminNavItems);
  } else if (user?.role === "manager") {
    navItems.push(...managerNavItems);
  }

  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2 group-data-[collapsible=icon]:hidden">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">VideoTracker</span>
        </div>
      </SidebarHeader>
      <div className="flex justify-end pr-2">
        <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={toggleSidebar}
        >
            {state === "expanded" ? <ChevronsLeft/> : <ChevronsRight />}
        </Button>
      </div>
     
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                 const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
                 return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive} 
                    tooltip={item.title}
                    className={isActive ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit" onClick={logout}>
                    <LogOut />
                    <span>Exit</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
