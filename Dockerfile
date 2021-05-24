FROM node:12 AS development

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]