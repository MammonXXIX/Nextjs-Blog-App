import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { BlogPublic } from '@/components/Pages/BlogPublic';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [id],
        queryFn: async () => {
            const response = await fetch(`/api/blogs/me/${id}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
    });

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb
                    overrides={{
                        [id]: id,
                    }}
                />
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <BlogPublic />
            </HydrationBoundary>
        </div>
    );
};

export default BlogPage;
