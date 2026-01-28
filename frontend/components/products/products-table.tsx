'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import type { Product, Category } from "@/types"

interface ProductsTableProps {
  products: Product[]
  categories: Category[]
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.name || 'Desconhecida'
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="hidden md:table-cell">Descricao</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preco</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium text-slate-500">{product.id}</TableCell>
              <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
              <TableCell className="hidden max-w-[300px] truncate text-slate-500 md:table-cell">
                {product.description}
              </TableCell>
              <TableCell className="text-slate-700">{product.brand}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {getCategoryName(product.category_id)}
                </span>
              </TableCell>
              <TableCell className="text-right font-medium text-slate-900">
                {formatCurrency(product.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
