"use client"

import * as React from "react"
import {
    CircleUser,
    Copy,
    Link,
    Star,
    Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

const data = [
    [
        {
            label: "Profil",
            icon: Link,
        },
        {
            label: "Setting",
            icon: Copy,
        }
    ],
    [
        {
            label: "Log out",
            icon: Trash2,
        },

    ]
]

export function NavActions() {
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        setIsOpen(false)
    }, [])

    return (
        <div className="flex items-center gap-4 text-sm">
            <ModeToggle />
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Star />
            </Button>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="data-[state=open]:bg-accent h-7 w-7"
                >
                    <CircleUser />
                </Button>
                
                </PopoverTrigger>
                <PopoverContent
                className="w-56 overflow-hidden rounded-lg p-0"
                align="end"
                >
                    <Sidebar collapsible="none" className="bg-transparent">
                        <SidebarContent>
                        {data.map((group, index) => (
                            <SidebarGroup key={index} className="border-b last:border-none">
                                <SidebarGroupContent className="gap-0">
                                    <SidebarMenu>
                                    {group.map((item, index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton>
                                                <item.icon /> <span>{item.label}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))}
                        </SidebarContent>
                    </Sidebar>
                </PopoverContent>
            </Popover>
        </div>
    )
}
