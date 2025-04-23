import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { Post } from '@/components/Post';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb
                    overrides={{
                        [id]: id,
                    }}
                />
            </div>

            <Post />

            <Link href={`${id}/edit`}>
                <div className="fixed bottom-10 right-10 p-5 rounded-full bg-accent-foreground">
                    <Pencil className="text-secondary" />
                </div>
            </Link>
        </div>
    );
};

export default BlogPage;
