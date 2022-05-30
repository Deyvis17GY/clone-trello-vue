FROM node:12
WORKDIR /clone-trello
ADD . /clone-trello
RUN npm install
EXPOSE 4000
CMD npm start