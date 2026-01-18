from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

  print("--- INICIANDO CARREGAMENTO DE DADOS ---")

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

