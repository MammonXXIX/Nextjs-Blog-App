'use client';

import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { use } from 'react';

type BlogPageProps = {
    params: Promise<{ id: string }>;
};

const BlogPage = ({ params }: BlogPageProps) => {
    const { id } = use(params);

    const { isLoading, error, data } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const response = await fetch(`/api/blogs/${id}`, {
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

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb
                    overrides={{
                        [id]: data.post.title,
                    }}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
                    <Image
                        src={data.post.imageUrl}
                        alt={data.post.title}
                        fill
                        priority
                        quality={20}
                        className="object-cover"
                    />
                </div>
                <div className="prose prose-slate">
                    <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
