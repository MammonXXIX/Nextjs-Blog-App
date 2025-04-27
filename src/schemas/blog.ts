import { z } from 'zod';

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const createBlogSchema = z.object({
    title: z.string().min(4, { message: 'Title At Least 4 Characters' }),
    description: z.string().min(4, { message: 'Description At Least 4 Characters' }),
    content: z.string().min(4, { message: 'Content At Least 4 Characters' }),
    image: z
        .instanceof(File, { message: 'Image Is Required' })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: 'Only .JPG, .PNG Images Are Allowed' })
        .refine((file) => file.size <= MAX_FILE_SIZE, { message: 'Max File Size Is 1MB' }),
});
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = z.object({
    title: z.string().min(4, { message: 'Title At Least 4 Characters' }),
    description: z.string().min(4, { message: 'Description At Least 4 Characters' }),
    content: z.string().min(4, { message: 'Content At Least 4 Characters' }),
    image: z
        .union([
            z
                .instanceof(File)
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
                .refine((file) => file.size <= MAX_FILE_SIZE),
            z.string().length(0),
        ])
        .optional(),
});
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;

export const blogSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    view: z.number(),
    imageUrl: z.string(),
    createdAt: z.coerce.date(),
    userId: z.string(),
});
export type BlogSchema = z.infer<typeof blogSchema>;
