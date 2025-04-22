import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import '../globals.css';
import ReactQueryProvider from '../ReactQueryProvider';

export const metadata: Metadata = {
    title: 'Blog App',
    description: 'Created By Mammon',
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ReactQueryProvider>
                        {children}
                        <Toaster />
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
