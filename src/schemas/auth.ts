import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(4, { message: 'Username At Least 4 Characters' }).toLowerCase(),
    email: z.string().email({ message: 'Invalid Format Email' }).toLowerCase(),
    password: z
        .string()
        .min(8, { message: 'Password At Least 8 Characters' })
        .regex(/[a-z]/, { message: 'Password At Least Have 1 Small Case' })
        .regex(/[A-Z]/, { message: 'Password At Least Have 1 Upper Case' })
        .regex(/[0-9]/, { message: 'Password At Least Have 1 Number' }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid Format Email' }).toLowerCase(),
    password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
