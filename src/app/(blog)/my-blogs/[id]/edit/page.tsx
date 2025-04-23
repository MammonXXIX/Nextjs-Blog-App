'use client';

import BlogForm from '@/components/BlogForm';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BlogSchema } from '@/schemas/blog';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type ResponsesPost = {
    message: string;
    post: BlogSchema;
};

const EditPage = () => {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery<ResponsesPost>({
        queryKey: [id],
        queryFn: async () => {
            const response = await fetch(`/api/blogs/${id}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
    });

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>

            <div>
                {isLoading && <LoadingSpinner />}
                {isError && <>Error: {error}</>}

                {data?.post && <BlogForm {...data} isEdit />}
            </div>
        </div>
    );
};

export default EditPage;
