'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialSummary } from '@/types/finance';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

type Props = {
  summary: FinancialSummary;
};

export function IncomeExpenseCharts({ summary }: Props) {
  const transformData = (type: 'INCOME' | 'EXPENSE') => {
    if (!summary?.groupedByCategory) return [];

    return Object.values(summary.groupedByCategory)
      .filter((item: any) => item.categoryType === type)
      .map((item: any) => ({
        name: item.categoryName,
        value: Number(item.totalAmount),
      }))
      .sort((a, b) => b.value - a.value);
  };

  const incomeData = transformData('INCOME');
  const expenseData = transformData('EXPENSE');

  const incomeColors = ['#16a34a', '#22c55e', '#4ade80', '#15803d'];
  const expenseColors = ['#ef4444', '#f97316', '#f59e0b', '#dc2626'];

  const renderChart = (
    title: string,
    icon: React.ReactNode,
    data: { name: string; value: number }[],
    colors: string[],
    emptyText: string,
  ) => (
    <Card className='border-none shadow-sm flex flex-col h-full'>
      <CardHeader>
        <CardTitle className='text-lg flex items-center gap-2'>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1 pb-4'>
        <div className='h-[300px] w-full'>
          {data.length === 0 ? (
            <div className='flex items-center justify-center h-full text-muted-foreground'>
              {emptyText}
            </div>
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey='value'
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat().format(value)
                  }
                />

                <Legend verticalAlign='bottom' height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {renderChart(
        'Income by Category',
        <TrendingUp className='h-5 w-5 text-green-600' />,
        incomeData,
        incomeColors,
        'No income data available',
      )}

      {renderChart(
        'Expenses by Category',
        <TrendingDown className='h-5 w-5 text-red-600' />,
        expenseData,
        expenseColors,
        'No expense data available',
      )}
    </div>
  );
}
