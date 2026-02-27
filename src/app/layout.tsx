'use client';

import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      })
  );

  const pathname = usePathname();

  // Define auth routes where sidebar and header should be hidden
  const authRoutes = ['/auth/login', '/auth/signup'];
  const isAuthRoute = authRoutes.includes(pathname);

  return (
    <html lang='en'>
      <head>
        <title>Personal Finance Tracker</title>

        <meta
          name="description"
          content="Manage your income, expenses, budgets, and finances."
        />

        <meta
          name="keywords"
          content="personal finance, expense tracker, budget web app, finance management"
        />

        <meta name="author" content="Solomon Shiferaw" />

        {/* Open Graph */}
        <meta property="og:title" content="Personal Finance Tracker" />
        <meta
          property="og:description"
          content="Track income and manage expenses easily."
        />
        <meta property="og:type" content="website" />
      </head>

      <body className='font-body antialiased selection:bg-primary selection:text-primary-foreground'>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <SidebarProvider>
              {isAuthRoute ? (
                // Render only children for auth routes (no sidebar/header)
                <div className='flex h-screen w-full'>
                  {children}
                </div>
              ) : (
                // Render with sidebar and header for protected routes
                <div className='flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950'>
                  <SidebarNav />
                  <Header>
                    {children}
                  </Header>
                </div>
              )}
            </SidebarProvider>
            <Toaster richColors position="top-right" />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}