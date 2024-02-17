FROM node:16-alpine

WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any dependencies
RUN npm install
COPY . .

EXPOSE 3000

# Run the bot when the container launches
CMD ["node", "index.js"]
