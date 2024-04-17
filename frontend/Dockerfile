FROM node:16-alpine AS build-stage

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . /usr/src/app

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build


FROM nginx:1.17.0-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT
CMD nginx -g 'daemon off;'
