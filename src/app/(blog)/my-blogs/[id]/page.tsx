'use client';

import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { BlogPrivate } from '@/components/Pages/BlogPrivate';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useMutation } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const BlogPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            return result;
        },
        onSuccess: (res) => {
            console.log(res);
            router.replace('/my-blogs');
        },
        onError: (err) => {
            console.log(err);
        },
    });

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb
                    overrides={{
                        [`${id}`]: `${id}`,
                    }}
                />
            </div>

            <BlogPrivate />

            <AlertDialog>
                <AlertDialogTrigger className="fixed bottom-30 right-10 p-5 rounded-full bg-destructive">
                    <Trash className="text-primary" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are You Absolutely Sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your blog post and remove its data from our system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Link href={`${id}/edit`}>
                <div className="fixed bottom-10 right-10 p-5 rounded-full bg-accent-foreground">
                    <Pencil className="text-secondary" />
                </div>
            </Link>
        </div>
    );
};

export default BlogPage;
