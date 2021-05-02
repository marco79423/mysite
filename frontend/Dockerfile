FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
COPY frontend/package.json ./package.json
COPY frontend/yarn.lock ./yarn.lock
RUN yarn

COPY frontend .

ARG REACT_APP_BACKEND_SERVER_URL

RUN CI=true npm run test:coverage

RUN yarn run dist
CMD ["npm", "run", "start"]

EXPOSE 3000
