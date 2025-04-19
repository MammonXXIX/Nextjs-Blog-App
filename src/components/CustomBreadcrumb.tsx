'use client';

import { Tilecase } from '@/utils/Tilecase';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb';

type CustomBreadcrumbProps = {
    overrides?: Record<string, string>;
};

export const CustomBreadcrumb = ({ overrides = {} }: CustomBreadcrumbProps) => {
    const pathname = usePathname();

    const segments = pathname.split('/').filter(Boolean);
    const paths = segments.map((_, index) => '/' + segments.slice(0, index + 1).join('/'));

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    const href = paths[index];
                    const label = overrides[segment] || Tilecase(decodeURIComponent(segment.replace(/-/g, ' ')));
                    const isLast = index === segments.length - 1;

                    return (
                        <div key={index} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                {!isLast ? (
                                    <>
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>{label}</Link>
                                        </BreadcrumbLink>
                                    </>
                                ) : (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
