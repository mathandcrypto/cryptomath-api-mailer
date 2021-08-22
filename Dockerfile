FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder  /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY . .

CMD ["npm", "run", "start:prod"]