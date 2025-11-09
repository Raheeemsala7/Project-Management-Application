import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useAuthStore } from "@/store/auth-store"

export function SiteHeader() {
    const {logout} = useAuthStore()
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-[#000000] text-white border-[#262A32]">
            <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="flex">
                    <SidebarTrigger className="-ml-1 hover:bg-[#262A33] hover:text-white text-[#BDC1CA]" />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />
                </div>
                <Button variant={"destructive"} onClick={logout} >Logout</Button>
            </div>
        </header>
    )
}