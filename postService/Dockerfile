FROM mhart/alpine-node:14

WORKDIR /svc

COPY package.json .

RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 50052
CMD [ "node", "index.js" ]