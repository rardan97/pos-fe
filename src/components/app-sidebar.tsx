import * as React from "react"
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react"

import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// This is sample data.
// const data = {
  
//   navMain: [
//     {
//       title: "Search",
//       url: "#",
//       icon: Search,
//     },
//     {
//       title: "Ask AI",
//       url: "#",
//       icon: Sparkles,
//     },
//     {
//       title: "Home",
//       url: "#",
//       icon: Home,
//       isActive: true,
//     },
//     {
//       title: "Inbox",
//       url: "#",
//       icon: Inbox,
//       badge: "10",
//     },
//   ],
  
  
  
// }

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Kasir",
    url: "/kasir",
    icon: Inbox,
  },
  {
    title: "Transaksi",
    url: "/transaksi",
    icon: Inbox,
  },
  {
    title: "Category",
    url: "/category",
    icon: Inbox,
  },
  {
    title: "Product",
    url: "/product",
    icon: Calendar,
  },
  {
    title: "Petugas",
    url: "/petugas",
    icon: Search,
  },
  {
    title: "Role",
    url: "/role",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
       <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-2 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
     <SidebarContent>
      
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: 20, height: 20 }}/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
