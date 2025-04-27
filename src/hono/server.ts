import { createClient } from '@/utils/supabase/server';
import { Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import authRoute from './routes/auth.route';
import blogRoute from './routes/blog.route';
import userRoute from './routes/user.route';

export const runtime = 'edge';

type Env = {
    Variables: {
        user: {
            id: string;
        };
    };
};

const app = new Hono<Env>().basePath('/api');

app.use(contextStorage());
app.use('/blogs/me/*', async (c, next) => {
    const supabase = await createClient();

    const { error: authError, data: authData } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!authData.user) {
        return c.json({ error: 'Authorization header missing' }, 401);
    }

    c.set('user', { id: authData.user.id });

    await next();
});

export const getUser = () => {
    return getContext<Env>().var.user;
};

app.route('/auth', authRoute);
app.route('/users', userRoute);
app.route('/blogs', blogRoute);

export { app };
