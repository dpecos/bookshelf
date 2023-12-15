FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
RUN chown -R node:node /app

USER node

RUN npm ci 

COPY . .

EXPOSE 8080
CMD npm start
