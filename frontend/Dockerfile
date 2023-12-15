FROM node:21-alpine AS builder

ARG REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_PORT $REACT_APP_BACKEND_PORT

WORKDIR /app
COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:21-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .

EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
