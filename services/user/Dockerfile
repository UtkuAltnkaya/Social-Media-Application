FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN mv .env.docker .env

ENV PORT=3001

EXPOSE 3001
CMD ["npm", "run", "start"]
