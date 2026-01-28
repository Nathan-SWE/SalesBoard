'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/products': 'Produtos',
  '/upload': 'Upload CSV',
}

export function Header() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'SalesBoard'

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
    </header>
  )
}
