FROM node:12
COPY . /app
WORKDIR /app
RUN yarn install
CMD yarn compile
EXPOSE 3000
