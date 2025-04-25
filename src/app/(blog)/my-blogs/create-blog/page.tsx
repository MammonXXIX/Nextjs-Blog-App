'use client';

import BlogForm from '@/components/BlogForm';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { createBlogSchema, type CreateBlogSchema } from '@/schemas/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const CreateBlogPage = () => {
    const router = useRouter();

    const form = useForm<CreateBlogSchema>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            title: '',
            description: '',
            content: '',
            image: undefined,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (dataForm: CreateBlogSchema) => {
            const formData = new FormData();

            formData.append('title', dataForm.title);
            formData.append('description', dataForm.description);
            formData.append('content', dataForm.content);
            formData.append('image', dataForm.image);

            const response = await fetch('/api/blogs', { method: 'POST', body: formData });
            const result = await response.json();

            if (!response.ok) console.log(`Result: ${response}`);

            return result;
        },
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err: Error) => {
            console.log(err);
        },
    });

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>

            <BlogForm<CreateBlogSchema> form={form} onSubmit={mutate} isPending={isPending} />
        </div>
    );
};

export default CreateBlogPage;
