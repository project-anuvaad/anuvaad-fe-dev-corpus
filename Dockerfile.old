FROM node:10-alpine
COPY / /app
WORKDIR /app
#RUN apk update && apk add git
RUN npm install
CMD npm run build
#EXPOSE 8081
