'use client';

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMediaQuery } from '@/hooks/use-media-query';

interface DataTablePaginationProps {
    page: number;
    pageSize: number;
    total: number;
    pages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export function DataTablePagination({
    page,
    pageSize,
    total,
    pages,
    onPageChange,
    onPageSizeChange,
}: DataTablePaginationProps) {
    const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of{' '}
                {total} transactions
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 sm:order-2">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => {
                            onPageSizeChange(Number(value));
                            onPageChange(1); // Reset to first page when changing page size
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 20, 30, 40, 50].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center text-sm font-medium whitespace-nowrap">
                        {isMobile ? (
                            <span>{page}/{pages || 1}</span>
                        ) : (
                            <span>Page {page} of {pages || 1}</span>
                        )}
                    </div>

                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange(1)}
                            disabled={page <= 1}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange(page + 1)}
                            disabled={page >= pages}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange(pages)}
                            disabled={page >= pages}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}