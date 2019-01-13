FROM node:10-alpine

RUN mkdir /app
WORKDIR /app
COPY frontend/package.json ./package.json
COPY frontend/yarn.lock ./yarn.lock
RUN yarn

COPY frontend .

ARG REACT_APP_BACKEND_SERVER_URL

RUN CI=true yarn test:coverage

RUN yarn run dist
CMD ["yarn", "start"]

EXPOSE 3000
