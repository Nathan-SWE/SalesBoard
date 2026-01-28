'use client'

import { useEffect, useState } from 'react'
import { getProducts, getCategories } from '@/lib/api'
import type { Product, Category } from '@/types'
import { ProductsTable } from '@/components/products/products-table'
import { Loader2, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        setError('Erro ao carregar produtos. Verifique se o backend esta rodando.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total de Produtos</p>
              <p className="text-2xl font-bold text-slate-900">{products.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductsTable products={products} categories={categories} />
    </div>
  )
}
