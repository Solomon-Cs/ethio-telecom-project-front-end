"use client"

import { Transaction } from "@/types/finance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Utensils, Home, Zap, Film, Briefcase, Car, Heart, Package } from "lucide-react"

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Food': return <Utensils className="h-4 w-4" />
    case 'Rent': return <Home className="h-4 w-4" />
    case 'Utilities': return <Zap className="h-4 w-4" />
    case 'Entertainment': return <Film className="h-4 w-4" />
    case 'Salary': return <Briefcase className="h-4 w-4" />
    case 'Shopping': return <ShoppingCart className="h-4 w-4" />
    case 'Transportation': return <Car className="h-4 w-4" />
    case 'Health': return <Heart className="h-4 w-4" />
    default: return <Package className="h-4 w-4" />
  }
}

export function RecentTransactions({
  transactions,
  onDelete,
}: {
  transactions: any[],
  onDelete: (id: string) => void,
}) {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 10).map((t) => (
            <div key={t.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-secondary/10' : 'bg-muted'}`}>
                  <CategoryIcon category={t.category} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{t.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.date} • {t.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className={`text-sm font-bold ${t.type === 'income' ? 'text-secondary' : 'text-foreground'}`}>
                  {t.type === 'income' ? '+' : '-'} {" ETB "} {t.amount.toLocaleString()}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(t.id)}
                  className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No transactions yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}