## Create project

nest new emp-mgmt-portal-api

## Packages

- npm i @nestjs/mongoose mongoose lodash moment class-validator class-transformer
- npm i --save @nestjs/serve-static

- npm i @types/lodash @types/moment --save-dev
- don't install @types/mongoose

## CLI commands

- create employee module
  nest g mo employee --no-spec
- create department module
  nest g mo department --no-spec

- create employee controller under employee module in employee folder
  nest g co employee employee --no-spec --flat
- create department controller under department module in department folder
  nest g co department department --no-spec --flat

- create employee service under employee module in employee folder
  nest g s employee employee --no-spec --flat
- create department service under department module in department folder
  nest g s department department --no-spec --flat

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

# production mode
$ npm run start:prod
```
