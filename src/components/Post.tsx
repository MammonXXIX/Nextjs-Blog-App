'use client';

import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from './ui/loading-spinner';
import Image from 'next/image';

export const Post = ({ id }: { id: string }) => {
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
    });

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-4 mt-20 mx-0 sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40">
            <h1 className="text-3xl">{data.post.title}</h1>
            <h3 className="text-xl text-muted-foreground">{data.post.description}</h3>
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
                <Image
                    src={data.post.imageUrl}
                    alt={data.post.title}
                    fill
                    loading="lazy"
                    quality={20}
                    className="object-cover"
                />
            </div>
            <div className="prose prose-slate">
                <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
            </div>
        </div>
    );
};
