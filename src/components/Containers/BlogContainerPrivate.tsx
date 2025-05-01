'use client';

import { GetBlogsPaginationResponse } from '@/types/blog';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { ButtonPagination } from '../ButtonPagination';
import { BlogCardPrivate } from '../Cards/BlogCardPrivate';
import BlogCardLoading from '../Loading/BlogCardLoading';

const BlogContainerPrivate = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = Number(searchParams.get('page')) || 1;

    const {
        data: res,
        isLoading,
        isError,
        error,
    } = useQuery<GetBlogsPaginationResponse>({
        queryKey: ['blogs/me', page],
        queryFn: async () => {
            const response = await fetch(`/api/blogs/me?page=${page}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
    });

    const totalPages = (res && res.totalPages) || 1;

    const handlePagination = (page: number) => {
        router.push(`/my-blogs?page=${page}`);
    };

    return (
        <div className="flex flex-col mt-4">
            {isLoading && <BlogCardLoading length={8} />}
            {isError && <p>Something Went Wrong: {error.message}</p>}
            {res && res.blogs.length === 0 && !isLoading && !isError && <p>No Posts Found.</p>}

            {res && res.blogs && res.blogs.length > 0 && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {res.blogs.map((post, index) => {
                            return <BlogCardPrivate key={post.id} {...post} isPriority={index < 4} />;
                        })}
                    </div>
                    <div className="mt-4">
                        <ButtonPagination page={page} totalPages={totalPages} handleChangePage={handlePagination} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogContainerPrivate;
