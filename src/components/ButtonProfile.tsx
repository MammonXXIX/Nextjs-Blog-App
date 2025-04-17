'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export const ButtonProfile = () => {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await fetch('/api/users/currentUser', {
                method: 'GET',
            });

            const result = await response.json();

            return result;
        },
        staleTime: 1000 * 60 * 10,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error();
            }

            return result;
        },
        onSuccess: (data) => {
            console.log(data);
            router.replace('/signin');
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full h-[50px] flex justify-start p-2">
                    {!isLoading ? (
                        <Button variant={'ghost'}>
                            <Avatar className="mr-2">
                                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                            {data.user.username}
                        </Button>
                    ) : (
                        <Skeleton className="w-full h-[50px]" />
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings />
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => mutate()}>
                        <LogOut />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
