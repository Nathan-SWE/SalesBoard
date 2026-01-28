'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { uploadCSV } from '@/lib/api'
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type UploadType = 'products' | 'sales' | 'categories'

interface UploadResult {
  type: UploadType
  success: boolean
  message: string
}

const uploadOptions: { type: UploadType; title: string; description: string }[] = [
  {
    type: 'products',
    title: 'Produtos',
    description: 'Colunas: id, name, description, price, category_id, brand',
  },
  {
    type: 'sales',
    title: 'Vendas',
    description: 'Colunas: id, product_id, quantity, total_price, date',
  },
  {
    type: 'categories',
    title: 'Categorias',
    description: 'Colunas: id, name',
  },
]

export function UploadForm() {
  const [uploading, setUploading] = useState<UploadType | null>(null)
  const [results, setResults] = useState<UploadResult[]>([])
  const [dragOver, setDragOver] = useState<UploadType | null>(null)
  const fileInputRefs = useRef<Record<UploadType, HTMLInputElement | null>>({
    products: null,
    sales: null,
    categories: null,
  })

  const handleUpload = async (file: File, type: UploadType) => {
    setUploading(type)
    try {
      const response = await uploadCSV(file, type)
      setResults(prev => [...prev.filter(r => r.type !== type), { 
        type, 
        success: true, 
        message: response.message 
      }])
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao fazer upload'
      setResults(prev => [...prev.filter(r => r.type !== type), { 
        type, 
        success: false, 
        message: errorMessage
      }])
    } finally {
      setUploading(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: UploadType) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file, type)
    }
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent, type: UploadType) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      handleUpload(file, type)
    }
  }

  const getResult = (type: UploadType) => results.find(r => r.type === type)

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {uploadOptions.map((option) => {
        const result = getResult(option.type)
        const isUploading = uploading === option.type
        const isDragOver = dragOver === option.type

        return (
          <Card 
            key={option.type}
            className={cn(
              'transition-all',
              isDragOver && 'ring-2 ring-blue-500 ring-offset-2'
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                {option.title}
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  'flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-6 transition-colors',
                  isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-200',
                  isUploading && 'opacity-50 pointer-events-none'
                )}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(option.type)
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, option.type)}
              >
                {isUploading ? (
                  <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                ) : (
                  <Upload className="h-10 w-10 text-slate-400" />
                )}
                
                <div className="text-center">
                  <p className="text-sm text-slate-500">
                    Arraste o arquivo CSV ou
                  </p>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => fileInputRefs.current[option.type]?.click()}
                    disabled={isUploading}
                  >
                    clique para selecionar
                  </button>
                </div>

                <input
                  ref={(el) => { fileInputRefs.current[option.type] = el }}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, option.type)}
                />
              </div>

              {result && (
                <div className={cn(
                  'mt-4 flex items-center gap-2 rounded-lg p-3 text-sm',
                  result.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                )}>
                  {result.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span>{result.message}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
