FROM node:8.9.1

RUN npm i gulp-cli -g

ENV HOME=/home/app

COPY package.json $HOME/locadora-backend/
COPY src $HOME/locadora-backend/src/

WORKDIR $HOME/locadora-backend
RUN npm install

EXPOSE 8080

CMD ["node", "src/server.js"]
