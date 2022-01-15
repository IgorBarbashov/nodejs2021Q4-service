FROM node:16.13.1-alpine3.15
ARG PORT
EXPOSE ${PORT}
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install --no-optional
COPY . .
CMD ["npm", "start"]