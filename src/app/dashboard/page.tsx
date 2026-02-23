'use client';
import { AIAssistant } from '@/components/finance/ai-assistant';
import { RecentTransactions } from '@/components/finance/recent-transactions';
import { SpendingChart } from '@/components/finance/spending-chart';
import { SummaryCards } from '@/components/finance/summary-cards';
import { TransactionForm } from '@/components/finance/transaction-form';
import { useFinanceStore } from '@/hooks/use-finance-store';
import { Sparkles } from 'lucide-react';
import React from 'react';

const DashboardPage = () => {
  const {
    transactions,
    summary,
    profile,
    addTransaction,
    deleteTransaction,
    isLoading,
  } = useFinanceStore();

  return (
    <>
      <main className='p-8 space-y-10 max-w-7xl mx-auto'>
        <section className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
              Dashboard
            </h1>
            <p className='text-muted-foreground font-medium'>
              Monitoring your financial landscape.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20'>
              <Sparkles className='h-4 w-4 text-amber-600' />
              <span className='text-[11px] font-black uppercase tracking-widest text-amber-700'>
                Premium Insight
              </span>
            </div>
          </div>
        </section>

        <SummaryCards summary={summary} currency={profile.currency} />

        <div className='grid gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-8 space-y-8'>
            <div className='grid gap-8 md:grid-cols-2'>
              <SpendingChart summary={summary} />
              <div className='space-y-4'>
                <h3 className='text-xs font-black uppercase tracking-widest text-muted-foreground px-1'>
                  Quick Add
                </h3>
                <TransactionForm onAdd={addTransaction} />
              </div>
            </div>
            <RecentTransactions
              transactions={transactions}
              onDelete={deleteTransaction}
              currency={profile.currency}
            />
          </div>

          <aside className='lg:col-span-4 h-fit sticky top-24'>
            <AIAssistant />
          </aside>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
