FROM node:19.2.0-alpine
WORKDIR /app
COPY ./package.json /app/
RUN npm i -g pnpm
RUN pnpm install
COPY ./app.js /app/
EXPOSE 3000
CMD ["pnpm", "start"]