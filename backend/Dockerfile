FROM node:12

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY . .

RUN yarn build

EXPOSE 5420
CMD [ "node", "./build/server.js" ]