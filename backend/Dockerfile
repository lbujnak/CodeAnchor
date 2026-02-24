####################  build  ####################
FROM node:22 AS build
WORKDIR /app

COPY shared ./shared
COPY backend ./backend

WORKDIR /app/shared
RUN npm install
RUN npm run build

WORKDIR /app/backend
RUN npm install
RUN npm run build

###################  runtime  ###################
FROM node:22-alpine

WORKDIR /app
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/prisma ./prisma
COPY --from=build /app/shared ./shared

RUN npm install --only=production

WORKDIR /app
RUN cd shared && npm link && cd .. && npm link shared

EXPOSE 3000
CMD ["node", "dist/index.js"]