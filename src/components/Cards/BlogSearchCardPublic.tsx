import { type BlogSchema } from '@/schemas/blog';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export const BlogSearchCardPublic = ({ id, title, description, view, imageUrl, createdAt, isPriority = false }: BlogSchema & { isPriority?: boolean }) => {
    const formattedDate = format(new Date(createdAt), 'dd MMMM yyyy');

    return (
        <Link href={`/${id}`}>
            <Card className="flex flex-row items-center w-full p-2 rounded-none bg-primary-foreground hover:bg-muted">
                <CardHeader className="relative w-[5rem] h-[5rem]">
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
                    <h2 className="line-clamp-2 text-sm text-muted-foreground">{description}</h2>
                </CardContent>
            </Card>
        </Link>
    );
};
