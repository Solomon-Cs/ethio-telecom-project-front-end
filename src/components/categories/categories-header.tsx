'use client';

import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, FilterX } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CategoryForm } from './categories-form';
import { CategoryFilters } from './categories-filters';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';

interface CategoriesHeaderProps {
    onFilterChange: (filters: any) => void;
    onRefresh: () => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
    isRefreshing?: boolean;
    onCreateCategory: (data: any) => Promise<void>;
    isCreating?: boolean;
}

export function CategoriesHeader({
    onFilterChange,
    onRefresh,
    onClearFilters,
    hasActiveFilters,
    isRefreshing,
    onCreateCategory,
    isCreating,
}: CategoriesHeaderProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <div className="space-y-4">
            {/* Title and Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Manage and track your income and expenses
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size={isMobile ? "icon" : "default"}
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        className={isMobile ? "h-10 w-10" : "gap-2"}
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {!isMobile && <span>Refresh</span>}
                    </Button>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2" size={isMobile ? "icon" : "default"}>
                                <Plus className="h-4 w-4" />
                                {!isMobile && <span>Add Category</span>}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Category</DialogTitle>
                            </DialogHeader>
                            <CategoryForm
                                onSubmit={async (data) => {
                                    await onCreateCategory(data);
                                    setIsAddDialogOpen(false);
                                }}
                                isSubmitting={isCreating}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <CategoryFilters onFilterChange={onFilterChange} />

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="w-fit gap-2"
                    >
                        <FilterX className="h-4 w-4" />
                        Clear all filters
                    </Button>
                )}
            </div>
        </div>
    );
}