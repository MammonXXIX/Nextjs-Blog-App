'use client';

import { type BlogSchema } from '@/schemas/blog';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { ButtonPagination } from './ButtonPagination';
import { PostCard } from './PostCard';
import { LoadingSpinner } from './ui/loading-spinner';

type ResponsePostContainer = {
    message: string;
    posts: BlogSchema[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

const PostContainer = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get('page')) || 1;

    const { data, isLoading, isError, error } = useQuery<ResponsePostContainer>({
        queryKey: ['your-blogs', page],
        queryFn: async () => {
            const response = await fetch(`/api/blogs?page=${page}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
    });

    const totalPages = data?.totalPages || 1;

    const handleChangePage = (page: number) => {
        router.push(`/my-blogs?page=${page}`);
    };

    return (
        <div className="flex flex-col mt-4">
            {isLoading && <LoadingSpinner />}
            {isError && <>Error: {error}</>}
            {data?.posts.length === 0 && !isLoading && !isError && <>No Posts Found.</>}

            {data?.posts && data.posts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.posts.map((post: BlogSchema, index) => {
                        return <PostCard key={post.id} {...post} isPriority={index < 4} />;
                    })}
                </div>
            )}

            <div className="mt-4">
                <ButtonPagination page={page} totalPages={totalPages} handleChangePage={handleChangePage} />
            </div>
        </div>
    );
};

export default PostContainer;
