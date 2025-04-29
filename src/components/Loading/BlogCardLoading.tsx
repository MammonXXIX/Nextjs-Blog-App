import { Skeleton } from '../ui/skeleton';

const BlogCardLoading = ({ length }: { length: number }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: length }).map((_, index) => (
                <Skeleton key={index} className="w-full  h-[18rem] rounded-2xl" />
            ))}
        </div>
    );
};

export default BlogCardLoading;
