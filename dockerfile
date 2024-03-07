FROM node:16.10.0-alpine

WORKDIR /usr/todo_list

COPY package.json .
COPY yarn.lock .

RUN apk add --no-cache git openssh

RUN yarn --ignore-engines

COPY . .

RUN yarn build

RUN mv .env.development .env

EXPOSE 3000

CMD ["yarn", "start"]