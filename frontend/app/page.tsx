'use client'

import { useEffect, useState } from 'react'
import { getDashboardMetrics, getCategories } from '@/lib/api'
import type { DashboardMetrics, Category } from '@/types'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { SalesChart } from '@/components/dashboard/sales-chart'
import { ProfitChart } from '@/components/dashboard/profit-chart'
import { CategoryFilter } from '@/components/dashboard/category-filter'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [metricsData, categoriesData] = await Promise.all([
          getDashboardMetrics(),
          getCategories()
        ])
        setMetrics(metricsData)
        setCategories(categoriesData)
      } catch (err) {
        setError('Erro ao carregar dados. Verifique se o backend esta rodando.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (!loading && !error) {
      async function fetchFilteredMetrics() {
        try {
          const data = await getDashboardMetrics(selectedCategory)
          setMetrics(data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchFilteredMetrics()
    }
  }, [selectedCategory, loading, error])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">{error}</p>
        <p className="text-sm text-slate-500">
          Certifique-se de que o servidor FastAPI esta rodando em http://localhost:8000
        </p>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">Nenhum dado disponivel</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <StatsCards
        totalRevenue={metrics.summary.total_revenue}
        totalProfit={metrics.summary.total_profit}
        totalItemsSold={metrics.summary.total_items_sold}
      />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart data={metrics.charts} />
        <ProfitChart data={metrics.charts} />
      </div>
    </div>
  )
}
