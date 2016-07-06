FROM node:5-slim
EXPOSE 8080

ENV DEBUG ''
ENV SESSION_SECRET ''
ENV PASSAXA_DOMAIN ''
ENV PASSAXA_CLIENT_ID ''
ENV PASSAXA_CLIENT_SECRET ''
ENV PASSAXA_CALLBACK_URL '/passaxa/callback'

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --quiet
COPY . /usr/src/app

RUN npm run bundle

CMD [ "npm", "start" ]
