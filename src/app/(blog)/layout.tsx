import { AppSidebar } from '@/components/AppSidebar';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import '../globals.css';
import ReactQueryProvider from '../ReactQueryProvider';

export const metadata: Metadata = {
    title: 'Blog App',
    description: 'Created By Mammon',
};

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ReactQueryProvider>
                        <SidebarProvider>
                            <div className="flex w-screen">
                                <AppSidebar />
                                <div className="flex flex-col flex-1 p-4">{children}</div>
                            </div>
                        </SidebarProvider>
                    </ReactQueryProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
