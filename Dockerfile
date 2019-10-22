# NodeJS version
FROM node:10.16.3-slim

ENV PROJECT_NAME api
ENV PROJECT_ROOT /opt/api

# Install dependencies
RUN mkdir -p /tmp/$PROJECT_NAME
ADD package.json /tmp/$PROJECT_NAME/package.json
RUN cd /tmp/$PROJECT_NAME/ && npm install
# Move dependencies
RUN mkdir -p $PROJECT_ROOT
RUN cp -a /tmp/$PROJECT_NAME/node_modules $PROJECT_ROOT

RUN npm i -g nodemon

WORKDIR $PROJECT_ROOT
COPY . $PROJECT_ROOT

EXPOSE 3000
CMD [ "npm", "run", "start:watch" ]