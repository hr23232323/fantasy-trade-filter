# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Set the PORT environment variable
ENV PORT 3000

# Set the command to run the development server with Yarn
# NOTE - If this was actually deployed to production, I'd
# Want to use nginx/serve etc. to build and serve the 
# production static files. Not needed for a POC tho.
CMD ["yarn", "start"]
