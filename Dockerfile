# Step 1: Build the React app
FROM node:20.16.0 AS build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]