# udaan - server

Welcome to Udaan's server!

## tech

1. Node.js
2. MySQL

# API

The API documentation can found [here](./docs/API.md).

## setup

1. Fork and clone.
2. Create database `udaanorg` in MySQL.
3. Get Redis from [here](https://redis.io/download).
3. Run `npm install` from root of this directory.

## build and run

Turn on your redis server.
```bash
$ npm run build
$ npx typeorm schema:sync # Run this during the first time only
$ npm start
```

## license

[MIT](./LICENSE)
