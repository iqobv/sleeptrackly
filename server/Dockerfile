FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN apk add --no-cache libc6-compat openssl

FROM base AS builder

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY server ./server

RUN pnpm install --frozen-lockfile

WORKDIR /app/server

ARG POSTGRES_URI
ENV POSTGRES_URI=$POSTGRES_URI

RUN pnpm dlx prisma generate
RUN pnpm run build

WORKDIR /app

RUN pnpm deploy --filter nest-server --prod /app/prod-out

WORKDIR /app/prod-out
COPY server/dist ./dist
COPY server/prisma ./prisma
COPY server/prisma.config.ts ./
COPY server/generated ./generated
RUN pnpm dlx prisma generate

FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/prod-out ./

USER nestjs
EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]
