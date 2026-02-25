"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialSummary } from "@/types/finance"
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

type CategoryType = "INCOME" | "EXPENSE";

interface CategorySummary {
  categoryName: string;
  categoryType: CategoryType;
  totalAmount: number;
}

export const CurrencyFormat = (value: number) => {
  return value?.toLocaleString("ETB", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function SummaryCards({ summary }: { summary: FinancialSummary }) {

  const summaryDate = summary?.summary;
  const summaryByCategoryDate = summary?.groupedByCategory;
  console.log("🚀 ~ SummaryCards ~ summaryDate:", summaryDate)

  const getTopCategory = (
    type: CategoryType
  ): { name: string; amount: number } | null => {
    const filtered = summaryByCategoryDate?.filter(
      (c: CategorySummary) => c.categoryType === type
    );

    if (!filtered?.length) return null;

    const top = filtered.reduce((max: CategorySummary, current: CategorySummary) =>
      current.totalAmount > max.totalAmount ? current : max
    );

    return {
      name: top.categoryName,
      amount: top.totalAmount,
    };
  };


  const topIncome = getTopCategory("INCOME");
  console.log("🚀 ~ SummaryCards ~ topIncome:", topIncome)
  const topExpense = getTopCategory("EXPENSE");
  console.log("🚀 ~ SummaryCards ~ topExpense:", topExpense)



  const cards = [
    {
      title: "Total Balance",
      value: CurrencyFormat(summaryDate?.balance),
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/10",
      description: "Available across accounts",
      trend: { value: "+2.5%", positive: true }
    },
    {
      title: "Total  Income",
      value: CurrencyFormat(summaryDate?.totalIncome),
      icon: TrendingUp,
      color: "text-secondary",
      bg: "bg-secondary/10",
      description: "Total earnings this period",
      trend: { value: "+12.3%", positive: true }
    },
    {
      title: "Total Expenses",
      value: CurrencyFormat(summaryDate?.totalExpense),
      icon: TrendingDown,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      description: "Total spending this period",
      trend: { value: "-4.2%", positive: true }
    },
    {
      title: "Top Categories",
      value: null, // not needed now
      icon: PieChart,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      description: "Highest income and expense categories",
      trend: null,
      extra: {
        income: topIncome
          ? `${topIncome.name} (ETB ${topIncome.amount.toLocaleString()})`
          : "None",
        expense: topExpense
          ? `${topExpense.name} (ETB ${topExpense.amount.toLocaleString()})`
          : "None",
      },
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

            {card.extra && (
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[10px] text-green-500 font-medium">{card.extra.income}</p>
                <p className="text-[10px] text-red-500 font-medium">{card.extra.expense}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}