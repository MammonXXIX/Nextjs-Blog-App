import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>
            <Skeleton className="max-w-full h-[200px] rounded-2xl" />
        </div>
    );
};

export default HomePage;
