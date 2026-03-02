'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useFinanceStore } from '@/hooks/use-finance-store';
import {
  Bell,
  LogOut,
  Mail,
  Search,
  UserCheck2,
  UserCircle,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Card } from '../ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Separator } from '../ui/separator';

const Header = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useFinanceStore();
  const [openProfile, setOpenProfile] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <SidebarInset className='w-full h-full'>
      <Card className='sticky top-0 z-30 border-0 rounded-none h-24 bg-white shadow-sm w-full'>
        <header className='sticky top-0 z-30 flex h-24 items-center gap-2 px-4 md:px-8'>
          {/* Sidebar toggle */}
          <SidebarTrigger className='flex-shrink-0' />

          {/* Search input */}
          <div className='relative flex-1 md:max-w-md w-full'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search transactions...'
              className='pl-10 pr-2 h-10 w-full rounded-xl border border-primary/20 bg-muted/30 focus-visible:ring-primary/20 text-sm'
            />
          </div>

          {/* Icons and profile */}
          <div className='ml-auto flex items-center gap-2 md:gap-3'>
            {/* Notification */}
            <Button
              variant='ghost'
              size='icon'
              className='rounded-full relative'
            >
              <Bell className='h-5 w-5' />
              <span className='absolute top-1 right-1 md:top-2 md:right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-background'></span>
            </Button>

            <div className='hidden md:block h-8 w-px bg-border mx-2' />

            {/* Profile Popover */}
            <Popover open={openProfile} onOpenChange={setOpenProfile}>
              <PopoverTrigger asChild>
                <div className='flex items-center gap-2 md:gap-3 cursor-pointer'>
                  <div className='flex flex-col items-end text-xs md:text-sm'>
                    <span className='font-bold leading-tight'>
                      {session?.user?.firstName} {session?.user?.middleName}
                    </span>
                    <span className='text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-tighter'>
                      {session?.user?.email}
                    </span>
                  </div>
                  <div className='h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20'>
                    {session?.user?.firstName?.charAt(0)}
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className='p-4' align='end'>
                <div className='space-y-2'>
                  <div className='flex gap-3 items-center'>
                    <UserCircle className='h-4 w-4' />
                    <span className='text-xs font-bold capitalize leading-tight'>
                      {session?.user?.firstName} {session?.user?.middleName}{' '}
                      {session?.user?.middleName}
                    </span>
                  </div>

                  <div className='flex gap-3 items-center'>
                    <UserCheck2 className='h-4 w-4' />
                    <span className='text-sm text-muted-foreground font-medium tracking-tighter'>
                      {session?.user?.username}
                    </span>
                  </div>

                  <div className='flex gap-3 items-center'>
                    <Mail className='h-4 w-4' />
                    <span className='text-sm text-muted-foreground font-medium tracking-tighter'>
                      {session?.user?.email}
                    </span>
                  </div>

                  <Separator className='mt-2' />

                  <div
                    onClick={handleSignOut}
                    className='flex gap-3 text-destructive items-center cursor-pointer'
                  >
                    <LogOut className='h-4 w-4' />
                    <span className='text-sm text-destructive font-medium uppercase tracking-tighter'>
                      Logout
                    </span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
      </Card>
      <main className='w-full p-4 md:p-6'>{children}</main>
    </SidebarInset>
  );
};

export default Header;
