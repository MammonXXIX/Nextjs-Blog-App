import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage = () => {
    return (
        <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="flex flex-row items-center pb-2 gap-2">
                <SidebarTrigger />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Home</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Breadcrumb */}
            <Skeleton className="max-w-full h-[200px] rounded-2xl" />
        </div>
    );
};

export default HomePage;
