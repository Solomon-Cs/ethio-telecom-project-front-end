'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { CategoryForm } from './categories-form';
import EmptyIcon from '../ui/empty-icon';

interface CategoriesTableProps {
  categories: any[];
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isLoadingByUser?: boolean;
}

export function CategoriesTable({
  categories,
  isLoadingByUser,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: CategoriesTableProps) {
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  return (
    <>
      <div className='rounded-xl border bg-card overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='bg-muted/50 hover:bg-muted/50'>
              <TableHead className='font-semibold'>Name</TableHead>
              <TableHead className='font-semibold'>Description</TableHead>
              <TableHead className='font-semibold'>Type</TableHead>
              <TableHead className='w-[50px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingByUser ? (
              <TableRow
                key={'test'}
                className='group hover:bg-muted/30 transition-colors w-full'
              >
                <TableCell
                  rowSpan={4}
                  colSpan={4}
                  className='font-medium w-full'
                >
                  <div className='h-40 w-full flex items-center justify-center '>
                    <div className='flex flex-col items-center gap-4'>
                      <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent' />
                      <p className='text-sm text-muted-foreground'>
                        Loading...
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {categories?.map((category: any) => (
                  <TableRow
                    key={category.id}
                    className='group hover:bg-muted/30 transition-colors'
                  >
                    <TableCell className='font-medium'>
                      {category?.name}
                    </TableCell>
                    <TableCell>
                      {category?.description || (
                        <span className='text-muted-foreground italic'>
                          No description
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {category?.type === 'INCOME' ? (
                          <>
                            <ArrowUpCircle className='h-4 w-4 text-emerald-500' />
                            <span className='text-emerald-600 dark:text-emerald-400 font-medium'>
                              Income
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDownCircle className='h-4 w-4 text-rose-500' />
                            <span className='text-rose-600 dark:text-rose-400 font-medium'>
                              Expense
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0 '>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-[160px]'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setEditingCategory(category)}
                            className='cursor-pointer'
                          >
                            <Pencil className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingCategory(category.id)}
                            className='cursor-pointer text-rose-600 focus:text-rose-600'
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {categories?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className='h-32 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <EmptyIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <CategoryForm
            initialData={editingCategory}
            onSubmit={(data) => {
              onEdit(editingCategory.id, data);
              setEditingCategory(null);
            }}
            isSubmitting={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingCategory}
        onOpenChange={() => setDeletingCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              category from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingCategory) {
                  onDelete(deletingCategory);
                  setDeletingCategory(null);
                }
              }}
              className='bg-rose-600 hover:bg-rose-700'
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
