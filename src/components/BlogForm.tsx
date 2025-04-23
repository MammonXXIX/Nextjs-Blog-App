'use client';

import { type BlogSchema, createBlogSchema, type CreateBlogSchema, updateBlogSchema, type UpdateBlogSchema } from '@/schemas/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Tiptap from './RichTextEditor/Tiptap';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type BlogFormProps = {
    isEdit?: boolean;
    post?: BlogSchema;
};

const BlogForm = ({ isEdit = false, post }: BlogFormProps) => {
    const router = useRouter();

    const form = useForm<CreateBlogSchema | UpdateBlogSchema>({
        resolver: zodResolver(isEdit ? updateBlogSchema : createBlogSchema),
        defaultValues: post
            ? { title: post.title, description: post.description, content: post.content, image: undefined }
            : { title: '', description: '', content: '', image: undefined },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (dataForm: CreateBlogSchema | UpdateBlogSchema) => {
            const formData = new FormData();

            formData.append('title', dataForm.title);
            formData.append('description', dataForm.description);
            formData.append('content', dataForm.content);

            if (dataForm.image instanceof File) formData.append('image', dataForm.image);
            else if (!isEdit) throw new Error('Image Is Required For New Post');

            const response =
                isEdit && post
                    ? await fetch(`/api/blogs/${post.id}`, { method: 'PATCH', body: formData })
                    : await fetch(`/api/blogs`, { method: 'POST', body: formData });
            const result = await response.json();

            if (!response.ok) throw new Error(result);

            return result;
        },
        onSuccess: (data) => {
            console.log(data);
            // toast(data.message);
            // router.replace('/');
        },
        onError: (err: Error) => {
            console.log(`Error: ${err}`);
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((dataForm) => {
                    const submissionData = isEdit ? ({ ...dataForm, image: dataForm.image || undefined } as UpdateBlogSchema) : (dataForm as CreateBlogSchema);

                    mutate(submissionData);
                })}
                className="flex flex-col gap-y-2"
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    {value && value instanceof File ? (
                                        <div className="relative w-full h-[13rem]">
                                            <Image
                                                src={URL.createObjectURL(value)}
                                                alt={value.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                                quality={50}
                                                className="object-cover rounded-xl"
                                            />
                                        </div>
                                    ) : (
                                        isEdit &&
                                        post && (
                                            <div className="relative w-full h-[13rem]">
                                                <Image
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority
                                                    quality={50}
                                                    className="object-cover rounded-xl"
                                                />
                                            </div>
                                        )
                                    )}
                                    <Input type="file" className="h-[40px]" {...fieldProps} onChange={(e) => onChange(e.target.files?.[0])} />
                                </div>
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
                                <Textarea placeholder="Type Your Description Blog Here" {...field} className="h-[100px]" />
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
                    {isEdit ? 'Update Blog' : 'Create Blog'}
                </Button>
            </form>
        </Form>
    );
};

export default BlogForm;
