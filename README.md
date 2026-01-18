# 📊 SalesBoard

> **Retail Intelligence Simplified.**
> Um sistema Fullstack para gestão de catálogo, análise de vendas e inteligência de dados para o varejo.

O **SalesBoard** é uma solução projetada para modernizar a operação comercial, permitindo a ingestão de dados legados (CSV), visualização de métricas de performance e gerenciamento de inventário em tempo real.

---

## 🚀 Funcionalidades Atuais

- **API de Alta Performance:** Backend construído com **FastAPI** para respostas rápidas.
- **Ingestão de Dados:** Leitura automatizada de arquivos corporativos (`products.csv`, `sales.csv`, `categories.csv`) utilizando **Pandas**.
- **Data Persistence Strategy:** Arquitetura flexível preparada para bancos SQL ou processamento em memória.
- **Documentação Automática:** Interface Swagger UI interativa para testes de endpoints.

---

## 🛠️ Tech Stack

- **Backend:** Python 3.10+, FastAPI, Uvicorn, Pandas.
- **Frontend:** React, TailwindCSS, Vite (Em desenvolvimento).
- **Database:** In-Memory (Protótipo) / PostgreSQL (Produção).

---

## ⚙️ Guia de Instalação e Execução

Siga os passos abaixo para rodar o servidor de desenvolvimento localmente.

### Pré-requisitos

- Python 3.12 ou superior instalado.
- Git instalado.

### 1. Clonar o Repositório

```bash
git clone https://github.com/Nathan-SWE/SalesBoard.git
cd SalesBoard
```

### 2. Configurar o Backend

Acesse o diretório do servidor e crie um ambiente virtual para isolar as dependências.

```bash
cd backend
python -m venv venv
```

### 3. Instalar Dependências

Com o ambiente ativado, instale as bibliotecas necessárias:

```bash
pip install -r requirements.txt
```

### 4. Executar o Servidor

Inicie a API em modo de desenvolvimento (com hot-reload):

```Bash
uvicorn main:app --reload
O terminal deverá exibir: INFO: Uvicorn running on http://127.0.0.1:8000
```

## 📡 Testando a API (Documentação Interativa)

O projeto conta com documentação automática via Swagger UI.

1. Com o servidor rodando, acesse no seu navegador: http://127.0.0.1:8000/docs

2. Você verá a lista de Endpoints disponíveis:

- `GET /products:` Retorna todo o catálogo de produtos importado.

- `GET /categories:` Lista as categorias disponíveis.

- `GET /sales:` Exibe o histórico de vendas brutas.

3. Para testar, clique na seta do endpoint, depois em "Try it out" e "Execute".
