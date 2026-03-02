'use client';

import {
  LayoutDashboard,
  ArrowLeftRight,
  UserCircle,
  Settings,
  LogOut,
  Sparkles,
  PieChart,
  Target,
  List,
  Wallet,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';

export function SidebarNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const mainMenuItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Transactions', url: '/transactions', icon: ArrowLeftRight },
    { title: 'Categories', url: '/category', icon: List },
    // { title: 'Reports', url: '/reports', icon: PieChart },
    { title: 'Profile', url: '/profile', icon: UserCircle },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <Sidebar className='border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white shadow-lg'>
      {/* Header - Brand Section */}
      <SidebarHeader className='p-5 border-b border-gray-100 dark:border-gray-800'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'>
              <Wallet className='h-5 w-5 text-white' />
            </div>
            <div className='absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-950'></div>
          </div>
          <div className='flex flex-col'>
            <span className='font-black text-lg tracking-tight leading-none bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
              FinTrack
            </span>
            <span className='text-[10px] font-semibold text-primary uppercase tracking-wider mt-0.5'>
              Premium Finance
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Main Content Area */}
      <SidebarContent className='px-3 py-4 bg-white dark:bg-gray-950 overflow-y-auto'>
        {/* Main Navigation */}
        <SidebarGroup className='mb-6'>
          <SidebarGroupLabel className='px-4 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider'>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-1'>
              {mainMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        relative rounded-xl h-11 px-4 
                        transition-all duration-200
                        ${
                          isActive
                            ? 'bg-primary/10 text-primary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-primary before:rounded-r-full'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <Link
                        href={item.url}
                        className='flex items-center gap-3 w-full'
                      >
                        <item.icon
                          className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`}
                        />
                        <span className='font-medium text-sm'>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats - Optional */}
        <div className='mt-auto mb-4 px-4 py-3 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl border border-primary/10 dark:border-primary/20'>
          <div className='flex items-center gap-2 mb-2'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-xs font-black uppercase tracking-wider'>
              Fin Tracker
            </span>
          </div>
          <p className='text-[10px] text-muted-foreground font-medium mb-3 leading-relaxed'>
            Track Your finance with Fin Tracker!
          </p>
          <div className='h-1.5 w-full bg-background/50 rounded-full overflow-hidden'>
            <div className='h-full w-4/5 bg-primary rounded-full'></div>
          </div>
        </div>
      </SidebarContent>

      {/* Footer - User Profile & Logout */}
      <SidebarFooter className='border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4'>
        <div className='space-y-3'>
          {/* User Profile Card */}
          <div className='flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200/50 dark:border-gray-700/50'>
            <Avatar className='h-10 w-10 border-2 border-primary/30 ring-2 ring-white dark:ring-gray-950'>
              <AvatarImage src='https://picsum.photos/seed/user123/40/40' />
              <AvatarFallback className='bg-primary/20 text-primary font-bold'>
                {session?.user?.firstName
                  ? session?.user?.firstName?.charAt(0).toUpperCase()
                  : session?.user?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-bold text-gray-900 dark:text-white truncate'>
                {session?.user?.username || 'Guest User'}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1'>
                <span className='h-1.5 w-1.5 bg-green-500 rounded-full'></span>
                {session?.user?.email || 'guest@example.com'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='grid grid-cols-2 gap-2'>
            <button className='flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-medium text-gray-700 dark:text-gray-300'>
              <CreditCard className='h-3.5 w-3.5' />
              <span>Billing</span>
            </button>
            <button
              onClick={handleSignOut}
              className='flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors text-xs font-medium text-red-600 dark:text-red-400'
            >
              <LogOut className='h-3.5 w-3.5' />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
