'use client';

import { ButtonPagination } from '@/components/ButtonPagination';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { Post } from '@/components/Post';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { Skeleton } from '@/components/ui/skeleton';
import { type BlogSchema } from '@/schemas/blog';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const MyBlogsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get('page')) || 1;

    const { isLoading, error, data } = useQuery({
        queryKey: ['your-blogs', page],
        queryFn: async () => {
            const response = await fetch(`/api/blogs?page=${page}`, {
                method: 'GET',
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error);
            }

            return result;
        },
        staleTime: 1000 * 60 * 5,
    });

    const totalPages = data?.totalPages || 1;

    const handleChangePage = (page: number) => {
        router.push(`/my-blogs?page=${page}`);
    };

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>
            <div className="flex flex-col flex-grow justify-between">
                <div>
                    <Link href="/my-blogs/create-blog">
                        <div className="flex border-4 border-dashed w-[200px] h-[200px] items-center justify-center">
                            <Plus size={64} />
                        </div>
                    </Link>

                    <div className="h-[4px] my-4 border-t-4" />
                    <h1 className="text-4xl font-bold">My Blog</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                        {data.posts.map((post: BlogSchema) => {
                            return <Post key={post.id} {...post} />;
                        })}
                    </div>
                </div>

                <div className="mt-4">
                    <ButtonPagination page={page} totalPages={totalPages} handleChangePage={handleChangePage} />
                </div>
            </div>
        </div>
    );
};

export default MyBlogsPage;
