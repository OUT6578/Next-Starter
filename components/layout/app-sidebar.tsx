"use client"

import * as React from "react"
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  LayoutDashboard,
  LogOut,
  Users,
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
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import axiosInstance from "@/lib/axios"


// Menu items based on the image
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },


]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const { toggleSidebar, state } = useSidebar()

  const handleLogout = async () => {
    try {
        await axiosInstance.post("/auth/logout");
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        router.push("/login");
    } catch (error) {
        console.error("Logout failed", error);
    }
  }

  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader />
      <div className="flex justify-end">
        <div ></div>
        <div>    <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={toggleSidebar}
        >
            {state === "expanded" ? <ChevronLeft /> : <ChevronRight />}
        </Button></div>
      </div>
     
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                 const isActive = pathname === item.url
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
              
               {/* About Page link as requested */}
               <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === "/about"} 
                    tooltip="About"
                    className={pathname === "/about" ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
                  >
                    <Link href="/about">
                      <Users /> 
                      <span>About</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit" onClick={handleLogout}>
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
