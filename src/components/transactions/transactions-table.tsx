'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
    MoreHorizontal,
    Pencil,
    Trash2,
    ArrowUpCircle,
    ArrowDownCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionForm } from './transaction-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import dayjs from 'dayjs';
import { CurrencyFormat } from '../finance/summary-cards';

interface TransactionsTableProps {
    transactions: any[];
    onEdit: (id: string, data: any) => void;
    onDelete: (id: string) => void;
    isUpdating?: boolean;
    isDeleting?: boolean;
}

export function TransactionsTable({
    transactions,
    onEdit,
    onDelete,
    isUpdating,
    isDeleting,
}: TransactionsTableProps) {
    console.log("🚀 ~ TransactionsTable ~ transactions:", transactions)
    const [editingTransaction, setEditingTransaction] = useState<any>(null);
    const [deletingTransaction, setDeletingTransaction] = useState<string | null>(
        null,
    );

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Food & Dining':
                'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
            'Shopping':
                'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            'Transportation':
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            'Entertainment':
                'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
            'Bills & Utilities':
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
            'Healthcare':
                'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
            'Education':
                'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
            'Travel':
                'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
            'Income':
                'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
            'Other':
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        };
        return (
            colors[category] ||
            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        );
    };

    return (
        <>
            <div className='rounded-xl border bg-card overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted/50 hover:bg-muted/50'>
                            <TableHead className='font-semibold'>Date</TableHead>
                            <TableHead className='font-semibold'>Category</TableHead>
                            <TableHead className='font-semibold'>Type</TableHead>
                            <TableHead className='font-semibold'>Description</TableHead>
                            <TableHead className='font-semibold text-right'>Amount</TableHead>
                            <TableHead className='w-[50px]'></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions?.map((transaction) => (
                            <TableRow
                                key={transaction.id}
                                className='group hover:bg-muted/30 transition-colors'
                            >
                                <TableCell className='font-medium'>
                                    {dayjs(transaction.date).format('DD MMM, YYYY HH:mm A')}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant='secondary'
                                        className={cn(
                                            'font-medium',
                                            getCategoryColor(transaction.category),
                                        )}
                                    >
                                        {transaction.category}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        {transaction.type === 'INCOME' ? (
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
                                    {transaction.description || (
                                        <span className='text-muted-foreground italic'>
                                            No description
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className='text-right font-semibold'>
                                    <span
                                        className={cn(
                                            transaction.type === 'INCOME'
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400',
                                        )}
                                    >
                                        {transaction.type === 'INCOME' ? '+' : '-'}
                                        {CurrencyFormat(transaction.amount)}
                                    </span>
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
                                                onClick={() => setEditingTransaction(transaction)}
                                                className='cursor-pointer'
                                            >
                                                <Pencil className='mr-2 h-4 w-4' />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setDeletingTransaction(transaction.id)}
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

                        {transactions?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className='h-32 text-center'>
                                    <div className='flex flex-col items-center justify-center text-muted-foreground'>
                                        <p>No transactions found</p>
                                        <p className='text-sm'>
                                            Add your first transaction to get started
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog
                open={!!editingTransaction}
                onOpenChange={() => setEditingTransaction(null)}
            >
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                    </DialogHeader>
                    <TransactionForm
                        initialData={editingTransaction}
                        onSubmit={(data) => {
                            onEdit(editingTransaction.id, data);
                            setEditingTransaction(null);
                        }}
                        isSubmitting={isUpdating}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog
                open={!!deletingTransaction}
                onOpenChange={() => setDeletingTransaction(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this
                            transaction from your records.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (deletingTransaction) {
                                    onDelete(deletingTransaction);
                                    setDeletingTransaction(null);
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
