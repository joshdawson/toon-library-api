FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm i

RUN npx nx build toon-library-api

EXPOSE 3000

CMD ["node", "./dist/apps/toon-library-api/main.js"]