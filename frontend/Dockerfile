FROM node:6-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn

COPY . .

ARG BACKEND_SERVER_URL
ARG SITE_VERSION
ARG SITE_UPDATED_TIME

RUN yarn test

RUN yarn run dist
CMD ["yarn", "start"]

EXPOSE 3000