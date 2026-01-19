from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import pandas as pd
import os

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

db_products = []
db_categories = []
db_sales = []

def load_initial_Data():
  global db_products, db_categories, db_sales

  base_path = "data"

  try:
    p_path = os.path.join(base_path, "products.csv")
    if os.path.exists(p_path):
      db_products = pd.read_csv(p_path).to_dict(orient="records")
      print(f"✅ {len(db_products)} Products loaded.")
    else:
      print(f"⚠️ File not found: {p_path}")

    c_path = os.path.join(base_path, "categories.csv")
    if os.path.exists(c_path):
      db_categories = pd.read_csv(c_path).to_dict(orient="records")
      print(f"✅ {len(db_categories)} Categories loaded.")

    s_path = os.path.join(base_path, "sales.csv")
    if os.path.exists(s_path):
      db_sales = pd.read_csv(s_path).to_dict(orient="records")
      print(f"✅ {len(db_sales)} Sales loaded.")
  
  except Exception as e:
    print(f"❌ Critical error when reading files: {e}")

load_initial_Data()

@app.get("/")
def read_root():
  return {"status": "API Online", "docs": "/docs"}

@app.get("/products")
def get_products():
  return db_products

@app.get("/categories")
def get_categories():
  return db_categories

@app.get("/sales")
def get_sales():
  return db_sales

@app.get("/dashboard/metrics")
def get_dashboard_metrics():
  if not db_sales:
    return {"message": "Sem dados de vendas"}

  df = pd.DataFrame(db_sales)

  df['date'] = pd.to_datetime(df['date'])
  df['month_name'] = df['date'].dt.month_name()
  df['month_num'] = df['date'].dt.month

  df['profit'] = df['total_price'] * 0.20

  monthly_group = df.groupby(['month_num', 'month_name'])[['total_price', 'profit', 'quantity']].sum().reset_index()

  monthly_group = monthly_group.sort_values('month_num')

  return {
    "summary": {
      "total_revenue": df['total_price'].sum(),
      "total_profit": df['profit'].sum(),
      "total_items_sold": int(df['quantity'].sum())
    },
    "charts": monthly_group.to_dict(orient="records")
  }