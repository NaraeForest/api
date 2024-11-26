FROM node:22-alpine AS base

FROM base AS builder
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

FROM base AS runner

WORKDIR /usr/src/app

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
RUN chown nestjs:nodejs .
USER nestjs

COPY --from=builder --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /usr/src/app/package*.json .

RUN npm ci --omit=dev

ENTRYPOINT [ "npm", "run",  "start:prod" ]
