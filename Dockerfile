# Step 1: Build the React app
FROM node:20.16.0 AS build
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN yarn install
# Copy the rest of the React app files
COPY . .
# Build the React app
RUN yarn build

 
# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the previous stage

COPY --from=build /app/build /usr/share/nginx/html
# Copy custom NGINX config
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]