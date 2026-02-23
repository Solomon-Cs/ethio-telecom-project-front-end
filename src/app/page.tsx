'use client';

import { useFinanceStore } from '@/hooks/use-finance-store';

export default function Home({ children }: { children: React.ReactNode }) {
  const {
    transactions,
    summary,
    profile,
    addTransaction,
    deleteTransaction,
    isLoading,
  } = useFinanceStore();

  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-background'>
        <div className='animate-pulse flex flex-col items-center'>
          <div className='h-16 w-16 bg-primary rounded-2xl mb-4 rotate-12'></div>
          <div className='h-4 w-24 bg-muted rounded'></div>
        </div>
      </div>
    );
  }

  return (
    // <div className='flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950'>
    <div>{children}</div>
  );
}
