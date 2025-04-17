import { Hono } from 'hono';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import blogRoute from './routes/blog.route';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.route('/auth', authRoute);
app.route('/users', userRoute);
app.route('/blogs', blogRoute);

export { app };
