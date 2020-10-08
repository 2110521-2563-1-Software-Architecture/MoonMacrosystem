FROM node:12

WORKDIR /usr/src/app

COPY package.json yarn.lock webpack.config.js ./

RUN yarn build

COPY . .

EXPOSE 5420
CMD [ "node", "./build/server.js" ]