'use client';

import Tiptap from '@/components/RichTextEditor/Tiptap';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { createBlogSchema, type CreateBlogSchema } from '@/schemas/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CreateBlogPage = () => {
    const form = useForm<CreateBlogSchema>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            title: '',
            description: '',
            content: '',
            image: undefined,
        },
    });

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dataForm: CreateBlogSchema) => {
            const formData = new FormData();

            formData.append('title', dataForm.title);
            formData.append('description', dataForm.description);
            formData.append('content', dataForm.content);
            formData.append('image', dataForm.image);

            const response = await fetch('/api/blogs', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result);
            }

            return result;
        },
        onSuccess: (data) => {
            toast(data.message);
            router.replace('/my-blogs');
        },
        onError: (error: Error) => {
            toast(error.message);
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
                            <BreadcrumbLink href="/my-blogs">My Blogs</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create Blog</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Breadcrumb */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit((dataForm) => mutate(dataForm))} className="flex flex-col gap-y-2">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="file"
                                        className="h-[40px]"
                                        {...fieldProps}
                                        onChange={(e) => onChange(e.target.files?.[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Your Blog Title" {...field} className="h-[40px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type Your Description Blog Here"
                                        {...field}
                                        className="h-[100px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Tiptap onChange={field.onChange} content={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="size-lg" disabled={isPending}>
                        Create Blog
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateBlogPage;
