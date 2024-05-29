FROM node:lts-alpine AS buildstage
WORKDIR /app
COPY public /app/public
COPY src /app/src
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --legacy-peer-deps --production
RUN npm run build

FROM nginx:alpine
COPY --from=buildstage /app/build /usr/share/nginx/html

COPY docker/nginx-entrypoint.sh /
RUN chmod +x nginx-entrypoint.sh
ENTRYPOINT ["/nginx-entrypoint.sh"]