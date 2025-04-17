'use client';

import { Post } from '@/components/Post';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BlogSchema } from '@/schemas/blog';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const MyBlogsPage = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['your-blogs'],
        queryFn: async () => {
            const response = await fetch('/api/blogs', {
                method: 'GET',
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error);
            }

            return result;
        },
    });

    return (
        <div className="flex flex-col">
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
            <div className="flex gap-4">
                <Link href="/my-blogs/create-blog">
                    <div className="flex border-4 border-dashed w-[200px] h-[200px] items-center justify-center">
                        <Plus size={64} />
                    </div>
                </Link>
            </div>
            <div className="h-[4px] my-4 border-t-4" />
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold">My Blog</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                    {data?.posts?.map((post: BlogSchema) => {
                        return <Post key={post.id} {...post} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyBlogsPage;
