import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';

const userRoute = new Hono();

userRoute.get('/currentUser', async (c) => {
    const supabase = await createClient();
    const prisma = new PrismaClient();

    try {
        const { error, data } = await supabase.auth.getUser();

        if (error) throw error;

        if (data.user) {
            const user = await prisma.user.findUnique({
                where: {
                    id: data.user.id,
                },
            });

            return c.json(
                {
                    message: 'Get Current User Successfully',
                    user: user,
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

export default userRoute;
