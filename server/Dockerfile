FROM node:22 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:22 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
ARG POSTGRES_URI
ENV POSTGRES_URI=$POSTGRES_URI
RUN npx prisma generate
RUN npm run build

FROM node:22 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 8080
CMD [ "node", "dist/src/main.js" ]
