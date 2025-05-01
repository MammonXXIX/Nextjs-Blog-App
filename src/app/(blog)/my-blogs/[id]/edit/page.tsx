'use client';

import BlogForm from '@/components/BlogForm';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BlogSchema, type UpdateBlogSchema, updateBlogSchema } from '@/schemas/blog';
import { GetBlogResponse } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EditPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

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

    const form = useForm<UpdateBlogSchema>({
        resolver: zodResolver(updateBlogSchema),
        defaultValues: {
            title: '',
            description: '',
            content: '',
            image: undefined,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (form: UpdateBlogSchema) => {
            const newForm = new FormData();

            newForm.append('title', form.title);
            newForm.append('description', form.description);
            newForm.append('content', form.content);

            if (form.image instanceof File) {
                if (res && res.blog.imageUrl) newForm.append('oldImage', res.blog.imageUrl);
                newForm.append('newImage', form.image);
            }

            const response = await fetch(`/api/blogs/${id}`, { method: 'PATCH', body: newForm });
            const result = await response.json();

            if (!response.ok) console.log(`Result: ${response}`);

            return result;
        },
        onSuccess: (res) => {
            console.log(res);

            queryClient.invalidateQueries({ queryKey: [id] });

            router.replace(`/my-blogs/${id}`);
        },
        onError: (err: Error) => {
            console.log(err);
        },
    });

    useEffect(() => {
        if (res && res.blog) {
            form.reset({
                title: res.blog.title,
                description: res.blog.description,
                content: res.blog.content,
                image: undefined,
            });
        }
    }, [res && res.blog, form]);

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>

            <div>
                {isLoading && <LoadingSpinner />}
                {isError && <>Error: {error}</>}

                {res && res.blog && <BlogForm<UpdateBlogSchema> isEdit blog={res.blog} form={form} onSubmit={mutate} isPending={isPending} />}
            </div>
        </div>
    );
};

export default EditPage;
