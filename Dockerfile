FROM node:12
WORKDIR /clone-trello
ADD . /clone-trello
RUN npm install
EXPOSE 8081
CMD npm start