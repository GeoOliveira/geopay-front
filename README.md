# geopay-front

Site institucional da **Geopay** (geopay.digital) — gateway de pagamento via Pix.

## Stack

- Next.js 15 (App Router) + TypeScript
- CSS global (`src/app/globals.css`), fontes Space Grotesk e JetBrains Mono via `next/font`

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Uso |
| --- | --- |
| `GEOPAY_API_URL` | URL do geopay-backend. Se definida, os planos da seção de tarifas vêm de `GET /plans`; senão usa valores de exemplo. |
| `NEXT_PUBLIC_APP_URL` | URL do painel (links "Entrar" e "Criar conta"). |
| `NEXT_PUBLIC_DOCS_URL` | URL da documentação da API. |

## Estrutura

```
src/
├── app/            # layout, página e estilos globais
├── components/     # seções da landing (Hero, BrazilMap, Solutions, LiveOps, Developers...)
├── data/           # textos, planos de exemplo e contorno dos estados do Brasil
└── lib/plans.ts    # busca dos planos no backend
prototipo/          # protótipo HTML aprovado
```

## Antes de publicar

- Números do painel ao vivo, taxas e o exemplo de código da API são ilustrativos.
- Conferir a frase "infraestrutura bancária regulada" com o parceiro bancário.
