FROM node:6-alpine
MAINTAINER 兩大類 <marco79423@gmail.com>

RUN mkdir /app
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn

COPY . .
RUN yarn test

RUN yarn run dist
CMD ["yarn", "start"]

EXPOSE 3000