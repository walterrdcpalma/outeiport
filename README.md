# Outeiport — MVP de Simulação ISV para Importação de Automóveis

## Estrutura do Projeto

```
/outeiport
├── /backend              ← ASP.NET Core 10 Web API
│   └── Outeiport.Api/
├── /frontend             ← React + Vite + TypeScript
│   └── outeiport-client/
├── global.json
├── .gitignore
└── README.md
```

## Stack

- **Backend:** ASP.NET Core 10, Clean Architecture + MediatR, PuppeteerSharp, FluentValidation, Resend
- **Frontend:** React 18, TypeScript, Vite, React Router v6, React Query, Tailwind CSS, Axios, React Hook Form
- **Deploy:** Railway (backend + frontend)
- **DB:** Supabase (futuro)

## Setup Inicial

### Backend

```bash
cd backend/Outeiport.Api
dotnet restore
dotnet build
dotnet run
```

Servidor corre em `https://localhost:5001`

### Frontend

```bash
cd frontend/outeiport-client
npm install
npm run dev
```

Dev server em `http://localhost:5173`

## Features

- ✅ Simulador ISV: paste URL do mobile.de → calcula ISV
- ✅ Pedir Proposta: formulário → email
- 🔄 Simulador de Crédito (futuro)
- 🔄 Páginas estáticas (futuro)

## Notas de Desenvolvimento

- ISV é estimativa (valores reais variam conforme documentos oficiais)
- Scraping do mobile.de usa PuppeteerSharp (headless browser)
- Email via Resend API (configurar chave em `.env`)
