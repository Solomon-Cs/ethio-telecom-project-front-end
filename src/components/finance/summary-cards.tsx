"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialSummary } from "@/types/finance"
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function SummaryCards({ summary, currency }: { summary: FinancialSummary, currency: string }) {
  const cards = [
    {
      title: "Total Balance",
      value: `${currency}${summary.balance.toLocaleString()}`,
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/10",
      description: "Available across accounts",
      trend: { value: "+2.5%", positive: true }
    },
    {
      title: "Monthly Income",
      value: `${currency}${summary.totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-secondary",
      bg: "bg-secondary/10",
      description: "Total earnings this period",
      trend: { value: "+12.3%", positive: true }
    },
    {
      title: "Monthly Expenses",
      value: `${currency}${summary.totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      description: "Total spending this period",
      trend: { value: "-4.2%", positive: true }
    },
    {
      title: "Top Category",
      value: Object.entries(summary.categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "None",
      icon: PieChart,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      description: "Highest spending area",
      trend: null
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="finance-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">{card.title}</CardTitle>
            <div className={cn("p-2 rounded-xl", card.bg)}>
              <card.icon className={cn("h-5 w-5", card.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight">{card.value}</div>
            <div className="flex items-center gap-2 mt-2">
              {card.trend && (
                <span className={cn(
                  "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  card.trend.positive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                  {card.trend.positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                  {card.trend.value}
                </span>
              )}
              <p className="text-[10px] text-muted-foreground font-medium">{card.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}