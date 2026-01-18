# Roadmap: SalesBoard

Este documento rastreia o progresso do desenvolvimento do MVP.

## Fase 1: Setup & Backend Básico (Arquitetura)

- [✅] Configuração do Git (Monorepo) e .gitignore
- [✅] Configuração do Ambiente Python (Virtualenv + FastAPI)
- [✅] Leitura inicial dos arquivos CSV (Dados em Memória)
- [✅] Endpoint GET /products (Listagem básica)
- [✅] Endpoint GET /categories (Listagem básica)
- [✅] Endpoint GET /sales (Listagem básica)

## Fase 2: Lógica de Negócio & Manipulação de Dados

- [ ] **Crucial:** Implementar lógica de cálculo de "Lucro" (Profit)
  - _Obs: Cruzar dados de Sales (venda) com Products (custo/preço)._
- [ ] Endpoint POST /upload/csv: Permitir upload real de arquivos para atualizar a base
- [ ] Endpoint POST /products: Inserção manual de um produto
- [ ] Refatoração: Organizar o código em `controllers` ou `routers` (Sair do main.py gigante)

## Fase 3: Front-end (React + Tailwind)

- [ ] Setup do Vite + React + Tailwind CSS
- [ ] Componente: Sidebar/Layout Navegável
- [ ] **Feature Principal:** Dashboard de Vendas
  - [ ] Gráfico 1: Vendas por Mês (Quantidade)
  - [ ] Gráfico 2: Lucro por Mês (R$)
- [ ] Página: Listagem de Produtos (Tabela com dados da API)
- [ ] Feature: Formulário de Upload de CSV (Integrado com o endpoint da Fase 2)

## Fase 4: Extras & Refinamentos

- [ ] Filtros por Categoria no Dashboard
- [ ] Edição de Valores (Vendas/Preços)
- [ ] Inserção de Novas Categorias
- [ ] Botão de Download CSV (Exportar dados)

## Fase 5: Deploy & Documentação (Entrega)

- [ ] Documentação README.md robusta (Instalação e Uso)
- [ ] Deploy Backend (Render.com)
- [ ] Deploy Frontend (Vercel)
- [ ] Teste final de integração em produção
