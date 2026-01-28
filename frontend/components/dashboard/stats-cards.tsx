'use client'

import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { DollarSign, TrendingUp, ShoppingCart } from "lucide-react"

interface StatsCardsProps {
  totalRevenue: number
  totalProfit: number
  totalItemsSold: number
}

export function StatsCards({ totalRevenue, totalProfit, totalItemsSold }: StatsCardsProps) {
  const stats = [
    {
      title: "Receita Total",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Lucro Total",
      value: formatCurrency(totalProfit),
      icon: TrendingUp,
      color: "bg-emerald-500",
    },
    {
      title: "Itens Vendidos",
      value: formatNumber(totalItemsSold),
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
