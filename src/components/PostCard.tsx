import { type BlogSchema } from '@/schemas/blog';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export const PostCard = ({ id, title, description, view, imageUrl, createdAt, isPriority = false }: BlogSchema & { isPriority?: boolean }) => {
    const formattedDate = format(new Date(createdAt), 'dd MMMM yyyy');

    return (
        <Link href={`my-blogs/${id}`}>
            <Card className="w-full p-0 rounded-none">
                <CardHeader className="relative w-full h-[9rem]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={isPriority}
                        quality={50}
                        className="object-cover rounded-xl"
                    />
                </CardHeader>
                <CardContent className="px-2 pb-2 flex flex-col gap-y-2">
                    <h1 className="line-clamp-1 text-lg font-semibold">{title}</h1>
                    <h2 className="line-clamp-2 text-muted-foreground">{description}</h2>
                    <span className="flex items-center text-xs text-muted-foreground">
                        <Eye className="mr-2" size={18} />
                        <span>
                            {view} Views | Created At {formattedDate}
                        </span>
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
};
