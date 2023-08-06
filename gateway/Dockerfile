# api-gateway/Dockerfile
FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g express-gateway
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm","run","start"]
