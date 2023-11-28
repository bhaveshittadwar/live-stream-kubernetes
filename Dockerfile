# Use an official Node.js runtime as the base image
FROM node:20

ENV DB_USERNAME=<username>
ENV DB_PASSWORD=<password>
ENV DB_NAME=myDatabase
ENV DB_HOST=cluster0.ngljk0z.mongodb.net

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 3000
EXPOSE 27017

# Define the command to start the application
CMD ["node", "app.js"]
