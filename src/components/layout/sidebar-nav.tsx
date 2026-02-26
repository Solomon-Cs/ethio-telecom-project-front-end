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
  const { data: session } = useSession()
  console.log("🚀 ~ SidebarNav ~ session:", session)

  const items = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Transactions', url: '/transactions', icon: ArrowLeftRight },
    { title: 'Categories', url: '/category', icon: List },
    // { title: 'Reports', url: '/reports', icon: PieChart },
    { title: 'Profile', url: '/profile', icon: UserCircle },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" })
  }

  return (
    <Sidebar className='border-r border-border/50 bg-background/80 backdrop-blur-xl'>
      <SidebarHeader className='p-6'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-2xl shadow-lg shadow-primary/20'>
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <div className='flex flex-col'>
            <span className='font-black text-lg tracking-tight leading-none'>
              FinTrack
            </span>
            <span className='text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5'>
              Finance Tracker
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='px-3'>
        <SidebarGroup>
          <SidebarGroupLabel className='px-4 text-[10px] uppercase tracking-widest font-bold'>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className='rounded-xl h-11 px-4 transition-all hover:bg-primary/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary'
                  >
                    <Link href={item.url}>
                      <item.icon className='h-5 w-5' />
                      <span className='font-semibold text-sm'>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className='mt-8 px-4 py-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10'>
          <div className='flex items-center gap-2 mb-2'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-xs font-black uppercase tracking-wider'>
              AI Insights
            </span>
          </div>
          <p className='text-[10px] text-muted-foreground font-medium mb-3 leading-relaxed'>
            Your spending is 15% lower than last month. Great job!
          </p>
          <div className='h-1.5 w-full bg-background/50 rounded-full overflow-hidden'>
            <div className='h-full w-4/5 bg-primary rounded-full'></div>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='w-full justify-start gap-3 p-2 rounded-xl h-14 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50'>
              <Avatar className='h-9 w-9 border-2 border-primary/20'>
                <AvatarImage src='https://picsum.photos/seed/user123/40/40' />
                <AvatarFallback className='bg-primary/10 text-primary font-bold'>
                  {session?.user.firstName ? session?.user?.firstName?.charAt(0).toUpperCase() + session?.user?.firstName?.charAt(1).toUpperCase() : "A"}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col items-start overflow-hidden'>
                <span className='text-sm font-bold truncate'>
                  {session?.user?.username}
                </span>
                <span className='text-[10px] font-bold text-primary uppercase tracking-tighter'>
                  {session?.user?.email}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className='mt-2'>
            <SidebarMenuButton onClick={handleSignOut} className='text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl'>
              <LogOut className='h-4 w-4' />
              <span className='font-semibold'>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
