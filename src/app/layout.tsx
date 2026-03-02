'use client';

import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log('🚀 ~ LayoutContent ~ pathname:', pathname);
  const router = useRouter();
  const { data: session, status } = useSession();

  const authRoutes = ['/auth/login', '/auth/signup'];
  const isAuthRoute = authRoutes.includes(pathname);

  // 🔐 Protect all routes
  useEffect(() => {
    if (status === 'loading') return;

    if (!session && !isAuthRoute) {
      router.replace('/auth/login');
    }
    if (session && pathname == '/') {
      router.replace('/dashboard');
    }
  }, [session, status, pathname, router]);

  if (status === 'loading') {
    return (
      <div className='h-screen w-full flex items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent' />
          <p className='text-sm text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  // 🚫 Prevent rendering protected pages without session
  if (!session && !isAuthRoute) {
    return null;
  }

  return isAuthRoute ? (
    <div className='flex h-screen w-full'>{children}</div>
  ) : (
    <div className='flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950'>
      <SidebarNav />
      <Header>{children}</Header>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <html lang='en'>
      <head>
        <title>Personal Finance Tracker</title>
        <meta
          name='description'
          content='Manage your income, expenses, budgets, and finances.'
        />
      </head>

      <body className='font-body antialiased selection:bg-primary selection:text-primary-foreground'>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <SidebarProvider>
              <LayoutContent>{children}</LayoutContent>
            </SidebarProvider>
            <Toaster richColors position='top-right' />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
