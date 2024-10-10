FROM node:20 AS build

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN npm yarn  build

FROM nginx

FROM nginx:alpine

EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html