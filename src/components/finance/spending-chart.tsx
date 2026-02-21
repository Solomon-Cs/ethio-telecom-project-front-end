"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialSummary } from "@/types/finance"
import { PieChart as PieChartIcon } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export function SpendingChart({ summary }: { summary: FinancialSummary }) {
  const data = Object.entries(summary.categoryTotals).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value);

  const COLORS = [
    'hsl(90, 100%, 45%)', // Primary Lime
    'hsl(51, 100%, 50%)', // Secondary Gold
    'hsl(33, 100%, 50%)', // Accent Orange
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f59e0b', // Amber
  ];

  return (
    <Card className="border-none shadow-sm flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Expenses by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}