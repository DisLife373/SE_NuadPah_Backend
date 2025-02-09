# Use an official Node.js image
FROM node:20.18.2-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure TypeScript is installed
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run build

# Expose Fastify's port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
