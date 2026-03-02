'use client';

import { useFinanceStore } from '@/hooks/use-finance-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import DashboardPage from './dashboard/page';

export default function Home({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div className='bg-white'>
        {pathname.includes('/dashboard') ? <DashboardPage /> : children}
      </div>
    </div>
  );
}
