FROM node:16.8.0
RUN mkdir node
COPY . ./node
WORKDIR ./node/
RUN yarn install

CMD ["yarn", "start"]
