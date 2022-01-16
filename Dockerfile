FROM node:16.13.1-alpine3.15
ARG PORT
EXPOSE ${PORT}
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD ["npm", "start"]