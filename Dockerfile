FROM node:20.18.2-alpine

WORKDIR /app

RUN apk update

RUN apk add openssl=3.3.2-r5

COPY package*.json ./

RUN npm install -g npm@latest 

RUN npm install cross-spawn@^7.0.5 --save

COPY . .

RUN npm install -g typescript

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
