FROM node:10.19.0-alpine

WORKDIR /user/src

ENV PORT 3000

# copy package.json and package-lock.jsons
COPY package*.json /user/

RUN npm install --prefer-offline

COPY /src /user/src
 
EXPOSE 3000 

CMD ["nodemon", "server.js"]