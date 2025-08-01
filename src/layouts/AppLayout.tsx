
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import {
Breadcrumb,
BreadcrumbItem,
BreadcrumbList,
BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
SidebarInset,
SidebarProvider,
SidebarTrigger,
} from "@/components/ui/sidebar"

const LayoutContent: React.FC = () => {

    return (  
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger />
                    <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbPage className="line-clamp-1">
                            Project Management & Task Tracking
                        </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="ml-auto px-3">
                    <NavActions />
                </div>
                </header>
                <Outlet />
                {/* 
                <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
                <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
                </div> */}
            </SidebarInset>
        </SidebarProvider>
    );
};

const AppLayout: React.FC = () => {
    return (
            <LayoutContent />
    );
};

export default AppLayout;
