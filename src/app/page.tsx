"use client"

import { useFinanceStore } from "@/hooks/use-finance-store"
import { SummaryCards } from "@/components/finance/summary-cards"
import { RecentTransactions } from "@/components/finance/recent-transactions"
import { SpendingChart } from "@/components/finance/spending-chart"
import { AIAssistant } from "@/components/finance/ai-assistant"
import { TransactionForm } from "@/components/finance/transaction-form"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { Sparkles, LayoutDashboard, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { 
    transactions, 
    summary, 
    profile, 
    addTransaction, 
    deleteTransaction, 
    isLoading 
  } = useFinanceStore()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-primary rounded-2xl mb-4 rotate-12"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-slate-950">
        <SidebarNav />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background/60 backdrop-blur-xl px-8">
            <SidebarTrigger className="lg:hidden" />
            <div className="hidden md:flex relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10 bg-muted/30 border-none rounded-xl focus-visible:ring-primary/20 h-10"
              />
            </div>
            
            <div className="ml-auto flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-background"></span>
              </Button>
              <div className="h-8 w-[1px] bg-border mx-2"></div>
              <div className="flex items-center gap-3 bg-card border border-border/50 px-4 py-1.5 rounded-2xl shadow-sm">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold leading-tight">{profile.username}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Personal</span>
                </div>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20">
                  {profile.username.charAt(0)}
                </div>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-10 max-w-7xl mx-auto">
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-muted-foreground font-medium">Monitoring your financial landscape.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-700">Premium Insight</span>
                </div>
              </div>
            </section>

            <SummaryCards summary={summary} currency={profile.currency} />

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <SpendingChart summary={summary} />
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Quick Add</h3>
                    <TransactionForm onAdd={addTransaction} />
                  </div>
                </div>
                <RecentTransactions 
                  transactions={transactions} 
                  onDelete={deleteTransaction} 
                  currency={profile.currency} 
                />
              </div>

              <aside className="lg:col-span-4 h-fit sticky top-24">
                <AIAssistant />
              </aside>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}