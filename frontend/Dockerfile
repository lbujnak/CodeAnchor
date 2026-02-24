####################  build  ####################
FROM node:22 AS build
WORKDIR /app

COPY shared ./shared
COPY frontend ./frontend

WORKDIR /app/shared
RUN npm install && npm run build

WORKDIR /app/frontend
RUN npm install && npm run build

###################  runtime  ###################
FROM nginx:1.27-alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
