FROM node:latest

RUN mkdir /home/app

COPY . /home/app

EXPOSE 4000

WORKDIR /home/app

RUN npm install

CMD ["npm", "start"]