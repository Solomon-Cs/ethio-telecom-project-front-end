'use client';
import { AIAssistant } from '@/components/finance/ai-assistant';
import { RecentTransactions } from '@/components/finance/recent-transactions';
import { IncomeExpenseCharts } from '@/components/finance/spending-chart';
import { SummaryCards } from '@/components/finance/summary-cards';
import { TransactionForm } from '@/components/finance/transaction-form';
import { useTransactions } from '@/hooks/use-transactions';
import { Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {

  const { data: session } = useSession();
  console.log("🚀 ~ DashboardPage ~ session:", session)

  const {
    summaryByUser,
    isLoadingSummaryByUser,
    transactionsByUser,
    isLoadingTransactionsByUser,
    deleteTransaction,
    createTransaction,
    refetch,
  } = useTransactions(session?.user?.id as string);
  console.log("🚀 ~ DashboardPage ~ transactionsByUser:", transactionsByUser)


  return (
    <>
      <main className='px-4 py-8 space-y-10 w-full '>
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

        <SummaryCards summary={summaryByUser} />

        <div className='grid gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-9 space-y-8'>
            <div className='grid gap-8 md:grid-cols-2'>
              <IncomeExpenseCharts summary={summaryByUser} />
              <div className='space-y-4'>
                <h3 className='text-xs font-black uppercase tracking-widest text-muted-foreground px-1'>
                  Quick Add
                </h3>
                <TransactionForm onAdd={createTransaction as any} />
              </div>
            </div>
            <RecentTransactions
              transactions={transactionsByUser}
              onDelete={deleteTransaction as any}
            />
          </div>

          <aside className='lg:col-span-3 h-fit sticky top-24'>
            <AIAssistant />
          </aside>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
