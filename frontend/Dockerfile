FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

COPY frontend/package.json ./package.json
COPY frontend/package-lock.json ./package-lock.json

RUN npm install

COPY frontend .
RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 3000
