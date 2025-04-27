'use client';

import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../ui/loading-spinner';
import Image from 'next/image';
import { type BlogSchema } from '@/schemas/blog';
import { useParams } from 'next/navigation';

type ResponsesPost = {
    message: string;
    post: BlogSchema;
};

export const BlogPrivate = () => {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery<ResponsesPost>({
        queryKey: [id],
        queryFn: async () => {
            const response = await fetch(`/api/blogs/me/${id}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
    });

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {isError && <>Error: {error}</>}

            {data?.post && (
                <div className="flex flex-col gap-4 mt-10 mx-0 sm:mx-0 md:mx-10 lg:mx-20 xl:mx-30">
                    <h1 className="text-3xl">{data.post.title}</h1>
                    <h3 className="text-xl text-muted-foreground">{data.post.description}</h3>
                    <div className="relative w-full h-[20rem]">
                        <Image
                            src={data.post.imageUrl}
                            alt={data.post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            quality={50}
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <div className="prose prose-slate">
                        <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
                    </div>
                </div>
            )}
        </div>
    );
};
