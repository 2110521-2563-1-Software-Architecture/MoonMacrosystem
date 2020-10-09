# Start of Backend Dockerfile
FROM node:13.1-alpine as build

WORKDIR /usr/src/app
COPY ./backend/package.json ./backend/yarn.lock ./
RUN yarn cache clean && yarn --update-checksums
COPY ./backend/ ./
RUN yarn build

# Stage - Production
FROM nginx:1.17-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#End of Backend Dockerfile