FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN mv .env.docker .env

RUN npx prisma generate

# RUN npx prisma migrate dev

EXPOSE 3003
CMD ["npm", "run", "start"]
