FROM node:16.13-alpine
ARG PORT
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]