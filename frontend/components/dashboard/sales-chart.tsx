'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatNumber } from "@/lib/utils"

interface ChartData {
  month_num: number
  month_name: string
  total_price: number
  profit: number
  quantity: number
}

interface SalesChartProps {
  data: ChartData[]
}

export function SalesChart({ data }: SalesChartProps) {
  const chartData = data.map(item => ({
    name: item.month_name.substring(0, 3),
    quantity: item.quantity,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por Mes (Quantidade)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Quantidade']}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
