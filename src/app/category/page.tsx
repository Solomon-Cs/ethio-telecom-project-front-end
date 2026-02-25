'use client';

import { CategoriesHeader } from '@/components/categories/categories-header';
import { CategoriesTable } from '@/components/categories/categories-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/hooks/use-category';
import { AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CategoryPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState({});
    const { data: session } = useSession();

    const {
        categoriesByUser,
        pagination,
        isLoadingByUser,
        errorByUser,
        refetchByUser,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategories(session?.user.id, {
        page,
        limit: pageSize,
        ...filters,
    });

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        setPage(1);
    };

    const handleClearFilters = () => {
        setFilters({});
        setPage(1);
    };

    const handleCreateCategory = async (data: any) => {
        await createCategory.mutateAsync({ ...data, userId: session?.user.id });
    };

    if (errorByUser) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Failed to load categories. Please try again.
                    </AlertDescription>
                </Alert>
                <Button onClick={() => refetchByUser()} className="mt-4">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <CategoriesHeader
                onFilterChange={handleFilterChange}
                onRefresh={() => refetchByUser()}
                onClearFilters={handleClearFilters}
                hasActiveFilters={Object.keys(filters).length > 0}
                isRefreshing={isLoadingByUser}
                onCreateCategory={handleCreateCategory}
                isCreating={createCategory.isPending}
            />

            {isLoadingByUser ? (
                <Card className="p-4">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </Card>
            ) : (
                <>
                    <CategoriesTable
                        categories={categoriesByUser as any}
                        onEdit={(id, data) => updateCategory.mutate({ id, data })}
                        onDelete={(id) => deleteCategory.mutate(id)}
                        isUpdating={updateCategory.isPending}
                        isDeleting={deleteCategory.isPending}
                    />

                    {pagination && pagination.total > 0 && (
                        <DataTablePagination
                            page={pagination.page}
                            pageSize={pagination.limit}
                            total={pagination.total}
                            pages={pagination.pages}
                            onPageChange={setPage}
                            onPageSizeChange={setPageSize}
                        />
                    )}
                </>
            )}
        </div>
    );
}