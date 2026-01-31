# Participa DF - Ouvidoria Digital Acessível

Solução desenvolvida no contexto do **1º Hackathon em Controle Social – Desafio Participa DF**, promovido pela Controladoria-Geral do Distrito Federal (CGDF). O objetivo é promover acessibilidade, multicanalidade e fortalecimento do controle social através de uma Ouvidoria Digital moderna e inclusiva.

## 🚀 Tecnologias Utilizadas

A solução foi arquitetada utilizando uma stack moderna baseada em JavaScript/TypeScript, dividida em Frontend (PWA) e Backend (API).

### Frontend (Client-side)
-   **Framework:** Next.js 14 (App Router)
-   **Linguagem:** TypeScript
-   **Estilização:** Tailwind CSS
-   **Ícones:** Lucide React
-   **Notificações:** Sonner
-   **Funcionalidades:**
    -   PWA (Progressive Web App) para instalação em dispositivos móveis.
    -   Geolocalização para registro de ocorrências.
    -   Gravação de áudio e upload de anexos.
    -   Modo escuro/claro (Dark/Light mode).

### Backend (Server-side)
-   **Framework:** NestJS
-   **Linguagem:** TypeScript
-   **Arquitetura:** Modular e escalável.
-   **API:** RESTful.

## 📦 Como Rodar o Ambiente

Para executar a solução completa, é necessário rodar tanto o serviço de backend quanto o frontend.

### Pré-requisitos
-   Node.js (Versão LTS recomendada)
-   Gerenciador de pacotes (npm, yarn ou pnpm)

### 1. Configurando e Rodando o Backend

Navegue até a pasta do backend, instale as dependências e inicie o servidor:

```bash
cd backend

# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
