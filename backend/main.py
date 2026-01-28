from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import pandas as pd
import os
import io

app = FastAPI()

class ProductCreate(BaseModel):
  name: str
  description: str
  price: float
  category_id: int
  brand: str

class CategoryCreate(BaseModel):
  name: str

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
def get_dashboard_metrics(category_id: Optional[int] = None):
  if not db_sales:
    return {"message": "Sem dados de vendas"}

  df = pd.DataFrame(db_sales)
  
  # Filter by category if provided
  if category_id is not None:
    products_df = pd.DataFrame(db_products)
    product_ids = products_df[products_df['category_id'] == category_id]['id'].tolist()
    df = df[df['product_id'].isin(product_ids)]
    
    if df.empty:
      return {
        "summary": {"total_revenue": 0, "total_profit": 0, "total_items_sold": 0},
        "charts": []
      }

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

# POST endpoints
@app.post("/products")
def create_product(product: ProductCreate):
  global db_products
  new_id = max([p['id'] for p in db_products], default=0) + 1
  new_product = {
    "id": new_id,
    "name": product.name,
    "description": product.description,
    "price": product.price,
    "category_id": product.category_id,
    "brand": product.brand
  }
  db_products.append(new_product)
  
  # Save to CSV
  df = pd.DataFrame(db_products)
  df.to_csv("data/products.csv", index=False)
  
  return new_product

@app.post("/categories")
def create_category(category: CategoryCreate):
  global db_categories
  new_id = max([c['id'] for c in db_categories], default=0) + 1
  new_category = {
    "id": new_id,
    "name": category.name
  }
  db_categories.append(new_category)
  
  # Save to CSV
  df = pd.DataFrame(db_categories)
  df.to_csv("data/categories.csv", index=False)
  
  return new_category

# Upload CSV endpoints
@app.post("/upload/products")
async def upload_products(file: UploadFile = File(...)):
  global db_products
  try:
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    required_cols = ['name', 'description', 'price', 'category_id', 'brand']
    if not all(col in df.columns for col in required_cols):
      raise HTTPException(status_code=400, detail=f"CSV deve conter as colunas: {required_cols}")
    
    if 'id' not in df.columns:
      max_id = max([p['id'] for p in db_products], default=0)
      df['id'] = range(max_id + 1, max_id + 1 + len(df))
    
    db_products = df.to_dict(orient="records")
    df.to_csv("data/products.csv", index=False)
    
    return {"message": f"{len(db_products)} produtos carregados com sucesso"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload/sales")
async def upload_sales(file: UploadFile = File(...)):
  global db_sales
  try:
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    required_cols = ['product_id', 'quantity', 'total_price', 'date']
    if not all(col in df.columns for col in required_cols):
      raise HTTPException(status_code=400, detail=f"CSV deve conter as colunas: {required_cols}")
    
    if 'id' not in df.columns:
      max_id = max([s['id'] for s in db_sales], default=0)
      df['id'] = range(max_id + 1, max_id + 1 + len(df))
    
    db_sales = df.to_dict(orient="records")
    df.to_csv("data/sales.csv", index=False)
    
    return {"message": f"{len(db_sales)} vendas carregadas com sucesso"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload/categories")
async def upload_categories(file: UploadFile = File(...)):
  global db_categories
  try:
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    required_cols = ['name']
    if not all(col in df.columns for col in required_cols):
      raise HTTPException(status_code=400, detail=f"CSV deve conter as colunas: {required_cols}")
    
    if 'id' not in df.columns:
      max_id = max([c['id'] for c in db_categories], default=0)
      df['id'] = range(max_id + 1, max_id + 1 + len(df))
    
    db_categories = df.to_dict(orient="records")
    df.to_csv("data/categories.csv", index=False)
    
    return {"message": f"{len(db_categories)} categorias carregadas com sucesso"}
  except Exception as e:
    raise HTTPException(status_code=400, detail=str(e))
