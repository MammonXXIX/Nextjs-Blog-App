import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import PostContainer from '@/components/PostContainer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const MyBlogsPage = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <SidebarTrigger />
                <CustomBreadcrumb />
            </div>
            <div className="flex flex-col">
                <Link href="/my-blogs/create-blog" className="flex border-4 border-dashed w-[200px] h-[200px] items-center justify-center">
                    <Plus size={64} />
                </Link>

                <div className="h-[1rem] my-4 border-t-4" />
                <h1 className="text-2xl font-bold">Last Created Blog</h1>

                <Suspense fallback={<LoadingSpinner />}>
                    <PostContainer />
                </Suspense>
            </div>
        </div>
    );
};

export default MyBlogsPage;
