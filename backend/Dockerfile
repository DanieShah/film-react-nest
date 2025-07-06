FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

FROM node:16-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json/ ./
RUN npm ci --omit=dev
COPY --from=builder app/dist ./dist

CMD [ "npm", "run", "start:prod" ]