FROM node:18
WORKDIR /usr/src/pokemon-app-backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]