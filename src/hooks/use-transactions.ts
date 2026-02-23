import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TransactionFilters, transactionService } from '@/services/transaction.service';
import { TransactionFormValues } from '@/lib/validations/transaction';
import { toast } from 'sonner';

export function useTransactions(filters: TransactionFilters = {}) {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['transactions', filters],
        queryFn: () => transactionService.getTransactions(filters),
    });

    const createTransaction = useMutation({
        mutationFn: (data: TransactionFormValues) => transactionService.createTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
            toast.success('Transaction created successfully', {
                description: 'Your transaction has been added.',
            });
        },
        onError: (error: any) => {
            toast.error('Failed to create transaction', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const updateTransaction = useMutation({
        mutationFn: ({ id, data }: { id: string; data: TransactionFormValues }) =>
            transactionService.updateTransaction(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
            toast.success('Transaction updated successfully', {
                description: 'Your changes have been saved.',
            });
        },
        onError: (error: any) => {
            toast.error('Failed to update transaction', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const deleteTransaction = useMutation({
        mutationFn: (id: string) => transactionService.deleteTransaction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
            toast.success('Transaction deleted successfully', {
                description: 'The transaction has been removed.',
            });
        },
        onError: (error: any) => {
            toast.error('Failed to delete transaction', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    return {
        transactions: data?.data || [],
        pagination: data?.meta,
        isLoading,
        error,
        refetch,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    };
}