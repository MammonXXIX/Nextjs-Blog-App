import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
    page: number;
    totalPages: number;
    handleChangePage: (page: number) => void;
};

export const ButtonPagination = ({ page, totalPages, handleChangePage }: PaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={page > 1 ? () => handleChangePage(page - 1) : undefined} />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === page;

                    return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                isActive={isActive}
                                onClick={!isActive ? () => handleChangePage(pageNum) : undefined}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={page < totalPages ? () => handleChangePage(page + 1) : undefined} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
