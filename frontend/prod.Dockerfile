# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application for production
RUN yarn build



# ===============================================
# Stage 2
# Serve the production build with nginx
# ===============================================
FROM nginx:alpine

# Copy the build output from the first stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default nginx port 80 to the outside world
EXPOSE 80

# Set the PORT environment variable
ENV PORT 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
