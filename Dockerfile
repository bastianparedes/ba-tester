FROM node:24.5.0

WORKDIR /app
COPY .. ..
RUN npm ci

CMD ["npm", "run", "dev"]
