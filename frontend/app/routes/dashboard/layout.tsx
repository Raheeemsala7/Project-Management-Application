import ProtectedRoute from "@/components/ProtectedRoute"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SiteHeader } from "@/components/sidebar/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export default function Layout() {
    return (
        <ProtectedRoute>

            <SidebarProvider>
                <AppSidebar />
                {/* <main>
                <SidebarTrigger />
                <Outlet />
                </main> */}

                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col bg-[#000000]">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>

        </ProtectedRoute>
    )
}