export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  brand: string;
}

export interface Sale {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  date: string;
}

export interface DashboardMetrics {
  summary: {
    total_revenue: number;
    total_profit: number;
    total_items_sold: number;
  };
  charts: {
    month_num: number;
    month_name: string;
    total_price: number;
    profit: number;
    quantity: number;
  }[];
}
