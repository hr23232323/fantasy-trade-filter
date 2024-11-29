# Stage 1: Build the Next.js application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and lockfile
COPY package.json yarn.lock ./

# Install all dependencies for build
RUN yarn install --frozen-lockfile

# Copy the rest of the app and build
COPY . .
RUN yarn build

# Stage 2: Create Production Image
FROM node:18-alpine

WORKDIR /app

# Copy necessary files
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public

# Install production dependencies and clean cache
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Expose port and start the app
EXPOSE 3000
CMD ["yarn", "start"]
