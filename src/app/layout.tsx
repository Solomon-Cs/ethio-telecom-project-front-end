import type { Metadata } from 'next';
import './globals.css';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Personal Finance Tracker | Smart Spending Insights',
  description:
    'Manage your finances, track spending, and get AI-powered insights with Personal Finance Tracker.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <SidebarProvider>
          <div className='flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950'>
            <SidebarNav />

            <div className='flex flex-col gap-0'>
              <Header />
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
