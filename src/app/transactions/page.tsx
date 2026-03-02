'use client';

import { TransactionsHeader } from '@/components/transactions/transactions-header';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactions } from '@/hooks/use-transactions';
import { AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const { data: session } = useSession();

  const {
    transactionsByUser,
    pagination,
    isLoadingTransactionsByUser,
    errorTransactionsByUser,
    refetchTransactionsByUser,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions(session?.user.id, {
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

  const handleCreateTransaction = async (data: any) => {
    await createTransaction.mutateAsync({ ...data, userId: session?.user.id });
  };

  if (errorTransactionsByUser) {
    return (
      <div className='p-6'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load transactions. Please try again.
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetchTransactionsByUser()} className='mt-4'>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card className='border-none rounded-md shadow-sm w-full h-full'>
        <div className='space-y-6 p-4 sm:p-6'>
          <TransactionsHeader
            onFilterChange={handleFilterChange}
            onRefresh={() => refetchTransactionsByUser()}
            onClearFilters={handleClearFilters}
            hasActiveFilters={Object.keys(filters).length > 0}
            isRefreshing={isLoadingTransactionsByUser}
            onCreateTransaction={handleCreateTransaction}
            isCreating={createTransaction.isPending}
          />
          <>
            <TransactionsTable
              transactions={transactionsByUser}
              isLoading={isLoadingTransactionsByUser}
              onEdit={(id, data) => updateTransaction.mutate({ id, data })}
              onDelete={(id) => deleteTransaction.mutate(id)}
              isUpdating={updateTransaction.isPending}
              isDeleting={deleteTransaction.isPending}
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
        </div>
      </Card>
    </>
  );
}
