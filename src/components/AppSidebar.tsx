'use client';

import { Home, Box, ChartColumnBig } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ButtonProfile } from './ButtonProfile';

type Page = {
    title: string;
    url: string;
    icon: React.ElementType;
};

const pages: Page[] = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
    },
    {
        title: 'My Blogs',
        url: '/my-blogs',
        icon: Box,
    },
    {
        title: 'Analytics',
        url: '/analytics',
        icon: ChartColumnBig,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="h-full">
                    <SidebarGroupLabel>Blog App</SidebarGroupLabel>
                    <SidebarGroupContent className="h-full flex flex-col flex-1">
                        <SidebarMenu className="flex flex-1">
                            {pages.map((page) => {
                                const isActive = pathname === page.url;

                                return (
                                    <SidebarMenuItem
                                        key={page.title}
                                        className={`rounded ${isActive ? 'bg-secondary' : ''}`}
                                    >
                                        <SidebarMenuButton asChild>
                                            <Link href={page.url}>
                                                <page.icon />
                                                <span>{page.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <ButtonProfile />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
