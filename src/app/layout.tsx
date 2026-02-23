'use client'; // Add this at the top

import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useState } from 'react';

// Note: You can't use Metadata export with 'use client'
// So you'll need to move metadata to a separate file or use a different approach

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

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      </head>

      <body className='font-body antialiased selection:bg-primary selection:text-primary-foreground'>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <div className='flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950'>
              <SidebarNav />
              <Header>
                {children}
              </Header>
            </div>
          </SidebarProvider>
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}