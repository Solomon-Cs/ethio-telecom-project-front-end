'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Header = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  return (
    <SidebarInset className='flex-1 overflow-auto'>
      <header className='sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background/60 backdrop-blur-xl px-8'>
        <SidebarTrigger className='' />
        <div className='hidden md:flex relative max-w-md w-full'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search transactions...'
            className='pl-10 bg-muted/30 border-none rounded-xl focus-visible:ring-primary/20 h-10'
          />
        </div>

        <div className='ml-auto flex items-center gap-3'>
          <Button variant='ghost' size='icon' className='rounded-full relative'>
            <Bell className='h-5 w-5' />
            <span className='absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-background'></span>
          </Button>
          <div className='h-8 w-[1px] bg-border mx-2'></div>
          <div className='flex items-center gap-3 bg-card border border-border/50 px-4 py-1.5 rounded-2xl shadow-sm'>
            <div className='flex flex-col items-end'>
              <span className='text-xs font-bold leading-tight'>
                {session?.user?.firstName + " " + session?.user?.middleName}
              </span>
              <span className='text-[10px] text-muted-foreground font-medium uppercase tracking-tighter'>
                {session?.user?.email}
              </span>
            </div>
            <div className='h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20'>
              {session?.user?.firstName?.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className='flex-1 p-6'>
        {children}
      </main>
    </SidebarInset>
  );
};

export default Header;