import { BlogSearch } from '@/components/BlogSearch';
import BlogContainerPublic from '@/components/Containers/BlogContainerPublic';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const HomePage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const response = await fetch('/api/blogs', { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
    });

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>

            <BlogSearch />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <BlogContainerPublic />
            </HydrationBoundary>
        </div>
    );
};

export default HomePage;
