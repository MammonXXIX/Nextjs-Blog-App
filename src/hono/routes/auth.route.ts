import { Hono } from 'hono';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { AuthError } from '@supabase/supabase-js';
import { SUPABASE_AUTH_ERROR_CODE } from '@/utils/supabase/ErrorCode';

const authRoute = new Hono();

authRoute.post('/signup', async (c) => {
    interface ExistingCredentialsError {
        username?: string;
        email?: string;
    }

    const supabase = await createClient();
    const prisma = new PrismaClient();

    try {
        const body = await c.req.json();
        const { username, email, password } = body;

        const [existingUsername, existingEmail] = await Promise.all([
            prisma.user.findUnique({ where: { username } }),
            prisma.user.findUnique({ where: { email } }),
        ]);

        if (existingUsername || existingEmail) {
            const errors: ExistingCredentialsError = {};

            if (existingUsername) errors.username = 'Username already exists';
            if (existingEmail) errors.email = 'Email already exists';

            return c.json({ errors, message: 'Credentials Conflict' }, 409);
        }

        const { error, data: signUpData } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        if (signUpData.user) {
            await prisma.user.create({
                data: {
                    id: signUpData.user.id,
                    username: username,
                    email: email,
                },
            });
        }

        return c.json({ message: 'Sign Up Successfully' }, 200);
    } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : 'Server Internal Error' }, 500);
    } finally {
        await prisma.$disconnect();
    }
});

authRoute.post('/signin', async (c) => {
    const supabase = await createClient();

    try {
        const body = await c.req.json();
        const { email, password } = body;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return c.json({ message: 'Sign In Successfully' }, 200);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.code) {
                case SUPABASE_AUTH_ERROR_CODE.INVALID_CREDENTIALS:
                    return c.json({ errors: error, message: 'Credentials Invalid' }, 401);
            }
        }

        return c.json({ error: error instanceof Error ? error.message : 'Server Internal Error' }, 500);
    }
});

authRoute.post('/signout', async (c) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return c.json({ message: 'Sign Out Failed' }, 500);
    }

    return c.json({ message: 'Sign Out Successfully' }, 200);
});

export default authRoute;
