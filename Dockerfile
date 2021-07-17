FROM node:14.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
