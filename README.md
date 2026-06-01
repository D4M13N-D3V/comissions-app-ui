# Request.Box — Web UI

The web frontend for **Request.Box**, a platform where artists let their followers request commissioned art pieces while keeping full control over their terms, pricing, and timeframe.

This repository is the **Next.js** application that customers, artists, and admins interact with. It does not talk to the database directly — it acts as a **backend-for-frontend (BFF)**, proxying authenticated requests through to the core API.

## Architecture

```
Browser ──▶ Next.js (this repo) ──▶ Core API ──▶ Database
            │  pages/* (UI)          (comissions-app-core-api)
            └─ pages/api/* (BFF proxy, attaches Auth0 token)

        Auth0 (authentication)        Stripe (artist payouts/payments)
```

- **Auth** is handled by [Auth0](https://auth0.com) via `@auth0/nextjs-auth0`. The browser never holds the API access token: the `pages/api/*` routes run server-side, attach the user's Auth0 access token, and forward the call to the core API (`NEXT_PUBLIC_API_URL`).
- The proxy layer is centralized in [`lib/apiProxy.ts`](lib/apiProxy.ts) (JSON routes), [`lib/uploadProxy.ts`](lib/uploadProxy.ts) (image uploads), and [`lib/requireAdmin.ts`](lib/requireAdmin.ts) (server-side admin gating).
- Authorization is enforced by the core API; the UI mirrors it for UX (hiding menus, redirecting non-admins).

### Related repositories

| Repo                              | Purpose                                   |
| --------------------------------- | ----------------------------------------- |
| **comissions-app-ui** (this repo) | Next.js web frontend                      |
| `comissions-app-core-api`         | Backend REST API (.NET)                   |
| `comissions-app-argocd`           | Helm charts + ArgoCD deployment manifests |

## Tech stack

- [Next.js 14](https://nextjs.org/) (Pages Router) · [React 18](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/) (Material UI, X Data Grid & Date Pickers) with Emotion
- [Auth0](https://auth0.com/) for authentication
- [ApexCharts](https://apexcharts.com/) for dashboards
- Image uploads via `formidable`

## Features

- **Discovery** — public artist pages and portfolios (`/box/[artistName]`)
- **Customers** — browse artists, submit requests, upload references, pay, and review completed work
- **Artists** — Stripe onboarding & payouts, manage incoming requests, deliver assets, edit portfolio and public page settings
- **Admins** — manage users, artists, and artist-access requests (server-side guarded under `/dashboard/admin/*`)

## Getting started

### Prerequisites

- Node.js 18+ (CI runs on 20)
- An Auth0 application and a running instance of the core API

### Install & run

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

### Configure Auth0

1. In the [Auth0 dashboard](https://manage.auth0.com/), create a **Regular Web Application**.
2. Under the application **Settings**, configure:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback` (and your production `https://<domain>/api/auth/callback`)
   - **Allowed Logout URLs**: `http://localhost:3000/` (and your production `https://<domain>/`)
3. Save.

### Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and fill in:

| Variable                | Description                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `AUTH0_ISSUER_BASE_URL` | Auth0 tenant issuer URL (`https://…`)                                                         |
| `AUTH0_CLIENT_ID`       | Auth0 application client ID                                                                   |
| `AUTH0_CLIENT_SECRET`   | Auth0 application client secret                                                               |
| `AUTH0_BASE_URL`        | This app's base URL — `http://localhost:3000` in dev, your HTTPS domain in prod               |
| `AUTH0_SECRET`          | ≥32-byte cookie-encryption key, **independent** of the client secret (`openssl rand -hex 32`) |
| `AUTH0_AUDIENCE`        | API identifier configured in Auth0                                                            |
| `AUTH0_SCOPE`           | Space-separated OAuth scopes for the access token                                             |
| `NEXT_PUBLIC_API_URL`   | Base URL of the core API this UI proxies to                                                   |

> ⚠️ **Never commit a populated env file.** All `.env*` files are git-ignored except `.env.example`. In production, inject these through your deployment platform's secret store — not a file in the repo.

## Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Production build                      |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint (`next lint`) + Prettier check |
| `npm run lint:fix`  | Auto-fix lint + format                |
| `npm run format`    | Format with Prettier                  |
| `npm run typecheck` | `tsc --noEmit`                        |
| `npm test`          | Run Jest tests                        |
| `npm run test:ci`   | Jest in CI mode                       |

## Project structure

```
pages/            Routes
  api/            BFF proxy endpoints (attach Auth0 token, forward to core API)
  dashboard/      Authenticated app (customer / artist / admin areas)
  box/            Public artist pages
components/        Feature components (dashboard, artist, customer)
core/             Theme, layout primitives, settings context (MUI template base)
layouts/          Page layouts
lib/              apiProxy / uploadProxy / requireAdmin helpers
navigation/       Sidebar navigation config
services/         Client-side data helpers (discovery)
styles/           Global styles
__tests__/        Unit tests
```

## Docker

The [`Dockerfile`](Dockerfile) is multi-stage; the default (last) stage is the production runtime, which runs as a non-root user.

```bash
docker build -t comissions-app-ui .          # production image
docker build --target dev -t comissions-app-ui:dev .   # dev image (hot reload)
docker run -p 3000:3000 --env-file .env.local comissions-app-ui
```

## CI/CD

GitHub Actions ([`.github/workflows`](.github/workflows)):

- **`ci.yml`** — lint, typecheck, test, and `next build`; builds the production Docker image; runs a Trivy filesystem scan (reported to the Security tab). On `main`, pushes the image to `ghcr.io/comissions-app/ui` as `:latest` + `:sha-<short>`.
- **`codeql.yml`** — CodeQL code scanning (security & quality).
- **`gitleaks.yml`** — secret scanning across history.
- **`release.yml`** — [semantic-release](https://semantic-release.gitbook.io/) cuts versioned GitHub releases, then a Trivy-gated image is published to GHCR with `semver` tags.

Releases are driven by [Conventional Commits](https://www.conventionalcommits.org/) — `feat:` and `fix:` commits on `main` trigger a release; other types do not. Dependencies and actions are kept current via Dependabot.

Deployment is managed by ArgoCD from the `comissions-app-argocd` repo, which deploys the `:latest` image published by this pipeline.
