'use client';

import { BlogSchema } from '@/schemas/blog';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { BlogCardPublic } from '../Cards/BlogCardPublic';
import { Skeleton } from '../ui/skeleton';
import { GetBlogsPublicResponse } from '@/hono/routes/blog.route';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/loading-spinner';

const BlogContainerPublic = () => {
    const {
        data: res,
        isPending,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<GetBlogsPublicResponse>({
        queryKey: ['blogs'],
        queryFn: async ({ pageParam }) => {
            const response = await fetch(`/api/blogs?${pageParam ? `cursor=${pageParam}` : ''}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const blogs = res?.pages.flatMap((page) => page.blogs);

    return (
        <div className="flex flex-col mt-4">
            {isPending && <LoadingSpinner />}
            {blogs?.length === 0 && !isPending && !isError && <>No Blogs Found.</>}

            {blogs && blogs.length > 0 && (
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {blogs.map((post: BlogSchema, index: number) => {
                            return <BlogCardPublic key={post.id} {...post} isPriority={index < 4} />;
                        })}
                    </div>
                    <div>
                        {hasNextPage && (
                            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                {isFetchingNextPage ? 'Loading...' : 'Load More'}
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {isError && <>Something Went Wrong: ${error.message}</>}
        </div>
    );
};

export default BlogContainerPublic;
