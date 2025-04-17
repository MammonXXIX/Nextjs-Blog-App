'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SignUpSchema, signUpSchema } from '@/schemas/auth';
import { SignUpApiError } from '@/types/ApiError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dataForm: SignUpSchema) => {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForm),
            });

            const result = await response.json();

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: result.message || 'Something Went Wrong',
                    errors: result.errors,
                };
            }

            return result;
        },
        onSuccess: (data) => {
            router.replace('/');
        },
        onError: (error: SignUpApiError) => {
            const { status, errors, message } = error;

            if (errors?.username) {
                form.setError('username', {
                    message: errors.username,
                });
            }

            if (errors?.email) {
                form.setError('email', {
                    message: errors.email,
                });
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex w-[60%] border rounded-xl overflow-hidden">
                <div className="bg-blue-500 w-1/2"></div>
                <div className="w-1/2 px-2">
                    <Card>
                        <CardHeader className="flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold">Create Account 👋</h1>
                            <p className="text-sm text-center text-muted-foreground">
                                Ensure your blog is completely flawless by refining its content, enhancing readability,
                                and eliminating any errors to create a polished and professional final result.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit((dataForm) => mutate(dataForm))}
                                    className="flex flex-col gap-y-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Username" {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Password"
                                                        type={isShowPassword ? 'text' : 'password'}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Label className="flex items-center gap-2">
                                        <Checkbox
                                            checked={isShowPassword}
                                            onCheckedChange={(checked) => setIsShowPassword(!!checked)}
                                        />
                                        Show Password
                                    </Label>
                                    <Button className="size-lg mt-4" disabled={isPending}>
                                        Create Account
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <div className="flex w-full items-center justify-center gap-4">
                                <div className="h-[2px] w-full border-t-2" />
                                <p className="text-nowrap text-sm text-muted-foreground">Or Continue With</p>
                                <div className="h-[2px] w-full border-t-2" />
                            </div>
                            <Button variant="secondary" className="w-full" size="lg">
                                <FcGoogle />
                                Create Account With Google
                            </Button>
                            <Button variant="secondary" className="w-full" size="lg">
                                <FaGithub />
                                Create Account With Github
                            </Button>
                            <p>
                                Already have account?{' '}
                                <Link href="/signin" className="font-bold text-blue-500">
                                    Sign In
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
