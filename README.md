
## Description
App to choose UTXOs for optimal transaction

## example Curls: 

get UTXOs by address
curl -s -H "Content-Type: application/json" -X GET "http://localhost:3000/tx?address=1Fooo19w8LN2pTpGzPu5hxgmbHzYr6C1KY"
list UTXOs to use with `amount`
curl -s -d '{"from":"1Fooo19w8LN2pTpGzPu5hxgmbHzYr6C1KY", "to":"15aQe4XKmXr4kPtb9UMTKceem7mNnLKD25", "amount": 0.001}' -H "Content-Type: application/json" -X POST "http://localhost:3000/tx"

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
