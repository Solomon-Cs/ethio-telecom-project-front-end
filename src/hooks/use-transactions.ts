import { TransactionFormValues } from '@/lib/validations/transaction';
import {
    TransactionFilters,
    transactionService,
} from '@/services/transaction.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useTransactions(
    userId?: string,
    filters: TransactionFilters = {},
) {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['transactions', filters],
        queryFn: () => transactionService.getTransactions(filters),
    });

    const {
        data: transactionsByUser,
        isLoading: isLoadingTransactionsByUser,
        error: errorTransactionsByUser,
        refetch: refetchTransactionsByUser,
    } = useQuery({
        queryKey: ['transactionsByUser', filters],
        queryFn: () =>
            transactionService.getTransactionByUserId(userId as string, filters),
    });

    const {
        data: summaryByUser,
        isLoading: isLoadingSummaryByUser,
        error: errorSummaryByUser,
        refetch: refetchSummaryByUser,
    } = useQuery({
        queryKey: ['summaryByUser'],
        queryFn: () => transactionService.getSummaryByUser(userId as string),
    });
    console.log('🚀 ~ useTransactions ~ summaryByUser:', summaryByUser);

    const createTransaction = useMutation({
        mutationFn: (data: any) => transactionService.createTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactionsByUser'] });
            queryClient.invalidateQueries({ queryKey: ['summaryByUser'] });
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
            queryClient.invalidateQueries({ queryKey: ['transactionsByUser'] });
            queryClient.invalidateQueries({ queryKey: ['summaryByUser'] });
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
            queryClient.invalidateQueries({ queryKey: ['transactionsByUser'] });
            queryClient.invalidateQueries({ queryKey: ['summaryByUser'] });
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
        isLoading,
        error,
        refetch,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        transactionsByUser: transactionsByUser?.data || [],
        pagination: transactionsByUser?.meta,
        isLoadingTransactionsByUser,
        errorTransactionsByUser,
        refetchTransactionsByUser,
        summaryByUser,
        isLoadingSummaryByUser,
        errorSummaryByUser,
        refetchSummaryByUser,
    };
}
