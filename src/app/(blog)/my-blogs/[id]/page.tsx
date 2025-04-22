import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { Post } from '@/components/Post';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb
                    overrides={{
                        [id]: 'Blog',
                    }}
                />
            </div>

            <Post id={id} />

            <div className="fixed bottom-10 right-10 p-5 rounded-full bg-accent-foreground">
                <Link href={`${id}/edit`}>
                    <Pencil className="text-secondary" />
                </Link>
            </div>
        </div>
    );
};

export default BlogPage;
