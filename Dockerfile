FROM node:16.1-alpine

WORKDIR /authsys

ADD . .

RUN npm i

CMD npm start
