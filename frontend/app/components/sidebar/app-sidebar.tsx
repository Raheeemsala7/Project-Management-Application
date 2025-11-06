import { CheckCircle2, LayoutDashboard, ListCheck, MagnetIcon, Settings, Users } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Menu items.
const items = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Workspaces",
        href: "/dashboard/workspaces",
        icon: Users,
    },
    {
        title: "My Tasks",
        href: "/dashboard/my-tasks",
        icon: ListCheck,
    },
    {
        title: "Members",
        href: `/dashboard/members`,
        icon: Users,
    },
    {
        title: "Achieved",
        href: `/dashboard/achieved`,
        icon: CheckCircle2,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-[#262A32]" >
            <SidebarHeader className="pt-4 px-2 pb-2 bg-[#000000]">
                <SidebarMenuButton size={"lg"} className="data-[state=open]:text-sidebar-accent-foreground  hover:bg-transparent active:bg-transparent flex gap-3 ">
                    <div className="flex aspect-square size-12  items-center
                        justify-center rounded-lg text-sidebar-primary-foreground bg-[#262A33] p-2 ">
                        <MagnetIcon />
                    </div>
                    <span className="truncate text-white text-3xl font-semibold">
                        Orico
                    </span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="bg-[#000000]">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <NavLink to={item.href}>
                                        {({ isActive, isPending }) => (
                                            <SidebarMenuButton className={`hover:bg-[#262A33] hover:text-white text-[#BDC1CA] active:bg-[#262A33] active:text-white ${isActive ? "bg-[#262A33] text-white" : ""} ${isPending ? "bg-[#262A33]" : ""}`}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        )}
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}