'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { LoadingSpinner } from '../ui/loading-spinner';
import { GetBlogResponse } from '@/types/blog';

export const BlogPrivate = () => {
    const { id } = useParams();

    const {
        data: res,
        isLoading,
        isError,
        error,
    } = useQuery<GetBlogResponse>({
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
            {isError && <p>Something Went Wrong: {error.message}</p>}

            {res && res.blog && (
                <div className="flex flex-col gap-4 mt-10 mx-0 sm:mx-0 md:mx-10 lg:mx-20 xl:mx-30">
                    <h1 className="text-3xl">{res.blog.title}</h1>
                    <h3 className="text-xl text-muted-foreground">{res.blog.description}</h3>
                    <div className="relative w-full h-[20rem]">
                        <Image
                            src={res.blog.imageUrl}
                            alt={res.blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            quality={50}
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <div className="prose prose-slate">
                        <div dangerouslySetInnerHTML={{ __html: res.blog.content }} />
                    </div>
                </div>
            )}
        </div>
    );
};
