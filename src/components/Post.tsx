import { type BlogSchema } from '@/schemas/blog';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

export const Post = ({ id, title, description, content, view, imageUrl, createdAt, userId }: BlogSchema) => {
    const formattedDate = format(new Date(createdAt), 'dd MMMM yyyy');

    return (
        <Card className="w-full border p-0 gap-1 overflow-hidden bg-primary-foreground">
            <CardHeader className="relative w-full h-[200px]">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover"
                    priority
                    quality={5}
                />
            </CardHeader>
            <CardContent className="px-2 pb-2 flex flex-col gap-y-2">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="line-clamp-2 text-muted-foreground">{description}</p>
                <span className="flex items-center text-xs text-muted-foreground">
                    <Eye className="mr-2" size={18} />
                    <span>
                        {view} Views | Created At {formattedDate}
                    </span>
                </span>
            </CardContent>
        </Card>
    );
};
