FROM node:12-alpine AS buildstage
WORKDIR /app
COPY public /app/public
COPY src /app/src
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=buildstage /app/build /usr/share/nginx/html