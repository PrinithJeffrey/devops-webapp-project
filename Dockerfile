# Use Node LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy app code
COPY app/ .

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
