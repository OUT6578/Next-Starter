// import { AppHeader } from "@/components/layout/app-header"
import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import {  SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-background">
        <AppHeader />
      </div>
      
      <AppSidebar className="!top-16 !h-[calc(100svh-4rem)] border-r" />
      <SidebarInset className="mt-16">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
