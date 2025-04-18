'use client';

import { ButtonPagination } from '@/components/ButtonPagination';
import { Post } from '@/components/Post';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';

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

    return (
        <div className="flex flex-col min-h-screen">
            {/* Breadcrumb */}
            <div className="flex flex-row items-center pb-2 gap-2">
                <SidebarTrigger />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>My Blogs</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Breadcrumb */}
            <div className="flex flex-col flex-grow justify-between">
                <div>
                    <Link href="/my-blogs/create-blog">
                        <div className="flex border-4 border-dashed w-[200px] h-[200px] items-center justify-center">
                            <Plus size={64} />
                        </div>
                    </Link>

                    <div className="h-[4px] my-4 border-t-4" />
                    <h1 className="text-4xl font-bold">My Blog</h1>

                    {isLoading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                            {[...Array(8)].map((_, index) => (
                                <Skeleton key={index} className="max-w-full h-[320px] rounded-2xl" />
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                        {data?.posts?.map((post: BlogSchema) => {
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
