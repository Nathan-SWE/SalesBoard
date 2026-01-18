Sistema interno para cadastro, visualização e análise de produtos e vendas, com um painel visual simples e eficiente para auxiliar na tomada de decisões.

O objetivo é criar uma base sólida para visualização de dados de vendas e permitir a inserção de produtos manualmente ou via arquivos CSV, com filtros e edição.

back-end | render.com
front-end | vercel
DB | neon.com

Interface Requirements:
• An interface to insert products based on the provided CSV.
• All the data should be in a database of your choice.
• A small and simple dashboard showing charts for sales, including profi t by total_price variation, over a year.

For backend: (render.com)
Note: this needs to be in Python; the framework is up to you.
• [ ] A POST endpoint for inserting new products;
• [ ] A GET endpoint for listing products, sales, including profi t.
• [ ] A GET endpoint for listing categories.
• [ ] A POST endpoint for inserting products from a CSV fi le

For frontend: (vercel)
Note: Framework needs to be a React or a React variant, for example (Vite, Nextjs, Quik), the libraries are up to you, but make sure you are using Tailwind CSS for styling (shadcn/radix) or Ant Design as a component library.
• [ ] Dashboard with a minimum of two charts, with sales representing quantity and sales profi t.
You can use bar charts or line charts, it’s up to you.
• [ ] A form for product registration
• [ ] The possibility to upload a CSV fi le and insert new products from it
• [ ] Filters by product category
Extras:
• [ ] Allow the user to edit the values, like the number of sales and prices, for each month of the year.
• [ ] Insertion of new categories.
• [ ] The possibility to download a CSV from the database products/sales.
