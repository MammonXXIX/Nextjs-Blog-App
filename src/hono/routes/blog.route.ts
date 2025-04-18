import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { v4 as uuidv4 } from 'uuid';

const blogRoute = new Hono();

blogRoute.get('/', async (c) => {
    const supabase = await createClient();
    const prisma = new PrismaClient();

    try {
        const { error: authError, data: authData } = await supabase.auth.getUser();

        if (authError) throw authError;

        const page = Number(c.req.query('page') ?? 1);
        const limit = 8;
        const skip = (page - 1) * limit;

        if (authData.user) {
            const [posts, total] = await Promise.all([
                prisma.post.findMany({
                    where: { userId: authData.user.id },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }, // opsional
                }),
                prisma.post.count({
                    where: { userId: authData.user.id },
                }),
            ]);

            return c.json(
                {
                    message: 'Get User Posts Successfully',
                    posts: posts,
                    page: page,
                    limit: limit,
                    total: total,
                    totalPages: Math.ceil(total / limit),
                },
                200
            );
        }
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : 'Server Internal Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

blogRoute.post('/', async (c) => {
    const supabase = await createClient();
    const prisma = new PrismaClient();

    try {
        const body = await c.req.formData();

        const title = body.get('title') as string;
        const description = body.get('description') as string;
        const content = body.get('content') as string;
        const image = body.get('image') as File;

        const uuid = uuidv4();

        const fileExtension = image.name.split('.').pop();
        const fileName = `${uuid}.${fileExtension}`;
        const filePath = `${uuid}/${fileName}`;

        const fileBuffer = await image.arrayBuffer();

        const { error: storageError, data: storageData } = await supabase.storage
            .from('post')
            .upload(filePath, fileBuffer);
        const { error: authError, data: authData } = await supabase.auth.getUser();

        if (storageError || authError) throw storageError || authError;

        if (storageData.fullPath && authData.user) {
            await prisma.post.create({
                data: {
                    id: uuid,
                    title: title,
                    description: description,
                    content: content,
                    view: 0,
                    imageUrl: `${process.env.SUPABASE_STORAGE_URL}${storageData.fullPath}`,
                    userId: authData.user.id,
                },
            });
        }

        return c.json({ message: 'Blog Created Successfully' }, 200);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : 'Server Internal Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

export default blogRoute;
