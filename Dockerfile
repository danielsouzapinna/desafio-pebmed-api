FROM node:12

COPY . /app

WORKDIR /app/

RUN rm -rf node_modules/

EXPOSE 8000

CMD [ "yarn", "dev:server" ]
