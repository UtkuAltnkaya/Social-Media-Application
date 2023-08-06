FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN mv .env.docker .env


EXPOSE 3000
CMD ["npm", "run","start"]
