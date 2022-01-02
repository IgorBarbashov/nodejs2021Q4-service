FROM node:16.13-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]