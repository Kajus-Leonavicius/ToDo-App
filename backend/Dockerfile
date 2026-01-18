# 1️⃣ Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Kopijuojame package.json ir package-lock.json
COPY package*.json ./

# Įdiegiame dependencies
RUN npm install

# Kopijuojame likusius failus
COPY . .

# Buildinam TypeScript
RUN npm run build

# 2️⃣ Production stage
FROM node:20-alpine

WORKDIR /app

# Kopijuojame package.json ir node_modules iš build stage
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000

# Paleidimas production: nodemon tik dev metu
CMD ["node", "dist/index.js"]
