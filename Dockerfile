FROM node:12
WORKDIR /clonetrello
ADD . /clonetrello
RUN npm install
EXPOSE 4000
CMD npm start