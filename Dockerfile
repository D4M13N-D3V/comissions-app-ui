FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies (with build toolchain for any native modules).
FROM base AS deps
RUN apk add --no-cache g++ make py3-pip libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# Build the application.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so the
# API URL must be present here (not just at container runtime) or client-rendered
# URLs resolve to `undefined/api/...`.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# Development image with hot reload.
FROM deps AS dev
ENV NODE_ENV=development
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production runtime: only the built output + production deps, as non-root.
# Last stage so `docker build` with no --target produces the production image.
FROM base AS production
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
