# udaan - server

Welcome to Udaan's server!

## tech

1. Node.js
2. MySQL
3. Redis

## API

The API documentation can be found [here](./docs/API.md).

## setup

1. Fork and clone.
2. Create database `udaanorg` in MySQL.
3. Get Redis from [here](https://redis.io/download).
4. You need to create your own `.env` file using the [.env.example](./.env.example) file as a reference. Set the values for `DATABASE_USER` and `DATABASE_PASSWORD` to what you have in your system.
5. Run `npm install` from root of this directory.

## build and run

Turn on your redis server.
```bash
$ npm run build
$ npx typeorm schema:sync # Run this during the first time only
$ npm start
```

## license

[MIT](./LICENSE)
