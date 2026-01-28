'use client'

import { cn } from '@/lib/utils'
import type { Category } from '@/types'
import { Filter } from 'lucide-react'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Filter className="h-4 w-4" />
        <span>Filtrar por categoria:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
