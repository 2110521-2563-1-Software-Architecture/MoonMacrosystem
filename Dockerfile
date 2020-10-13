# Start of Backend Dockerfile
FROM node:13.1-alpine as build

WORKDIR /usr/src/app
COPY ./backend/package.json ./backend/yarn.lock ./
RUN yarn cache clean && yarn --update-checksums
COPY ./backend/ ./
RUN yarn build

# Stage - Production
EXPOSE 5420
CMD [ "node", "./build/index.js" ]
#End of Backend Dockerfile