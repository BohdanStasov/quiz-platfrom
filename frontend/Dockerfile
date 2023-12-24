FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY vite.config.js .

RUN npm install -g vite
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]