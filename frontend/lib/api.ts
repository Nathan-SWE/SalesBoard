import axios from 'axios'
import type { Product, Sale, DashboardMetrics, Category } from '@/types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
})

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/products')
  return response.data
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>('/categories')
  return response.data
}

export async function getSales(): Promise<Sale[]> {
  const response = await api.get<Sale[]>('/sales')
  return response.data
}

export async function getDashboardMetrics(categoryId?: number | null): Promise<DashboardMetrics> {
  const params = categoryId ? { category_id: categoryId } : {}
  const response = await api.get<DashboardMetrics>('/dashboard/metrics', { params })
  return response.data
}

export async function uploadCSV(file: File, type: 'products' | 'sales' | 'categories'): Promise<{ message: string }> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post(`/upload/${type}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await api.post<Product>('/products', product)
  return response.data
}

export default api
