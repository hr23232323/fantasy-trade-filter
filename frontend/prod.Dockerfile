# Stage 1: Build the Next.js application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy only essential files for installing dependencies
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies) for building the app
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Production Image with a slimmer base
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy only essential files and dependencies from build stage
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --prefer-offline

# Copy only the built application from the previous stage
COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public - Add when we have a public folder
COPY --from=build /app/node_modules ./node_modules

# Expose the default Next.js port
EXPOSE 3000

ENV PORT 3000

# Start Next.js in production mode
CMD ["yarn", "start"]
