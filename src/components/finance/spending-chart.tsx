'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialSummary } from '@/types/finance';
import { BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

type Props = {
  summary: FinancialSummary;
};

export function IncomeExpenseBarChart({ summary }: Props) {
  const transformData = () => {
    if (!summary?.groupedByCategory) return [];

    const map: Record<
      string,
      { category: string; income: number; expense: number }
    > = {};

    Object.values(summary.groupedByCategory).forEach((item: any) => {
      const category = item.categoryName;

      if (!map[category]) {
        map[category] = { category, income: 0, expense: 0 };
      }

      if (item.categoryType === 'INCOME') {
        map[category].income += Number(item.totalAmount);
      }

      if (item.categoryType === 'EXPENSE') {
        map[category].expense += Number(item.totalAmount);
      }
    });

    return Object.values(map).sort(
      (a, b) => b.income + b.expense - (a.income + a.expense),
    );
  };

  const data = transformData();

  return (
    <Card className='border-none shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <BarChart3 className='h-5 w-5 text-primary' />
          Income vs Expense by Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='h-[400px] w-full'>
          {data.length === 0 ? (
            <div className='flex items-center justify-center h-full text-muted-foreground'>
              No financial data available
            </div>
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data} barGap={8}>
                <CartesianGrid strokeDasharray='3 3' vertical={false} />

                <XAxis dataKey='category' />

                <YAxis
                  tickFormatter={(value) =>
                    new Intl.NumberFormat().format(value)
                  }
                />

                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat().format(value)
                  }
                />

                <Legend />

                <Bar
                  dataKey='income'
                  name='Income'
                  radius={[6, 6, 0, 0]}
                  fill='#16a34a'
                />

                <Bar
                  dataKey='expense'
                  name='Expense'
                  radius={[6, 6, 0, 0]}
                  fill='#ef4444'
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
