import { type BlogSchema } from '@/schemas/blog';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';

export const BlogSearchCardPublic = ({ id, title, description, imageUrl, isPriority = false }: BlogSchema & { isPriority?: boolean }) => {
    return (
        <Link href={`/${id}`}>
            <Card className="flex flex-row items-center w-full p-2 rounded-none bg-primary-foreground hover:bg-muted">
                <CardHeader className="relative w-[5rem] h-[5rem]">
                    <Image src={imageUrl} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={isPriority} quality={50} className="object-cover rounded-xl" />
                </CardHeader>
                <CardContent className="px-2 pb-2 flex flex-col gap-y-2">
                    <h1 className="line-clamp-1 text-lg font-semibold">{title}</h1>
                    <h2 className="line-clamp-2 text-sm text-muted-foreground">{description}</h2>
                </CardContent>
            </Card>
        </Link>
    );
};
