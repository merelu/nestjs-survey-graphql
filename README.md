## Description

설문조사 서버 어플리케이션

## Installation

```bash
$ npm install
```

## Env

환경설정 루트에 .env 파일 추가

```bash
#Server
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_SCHEMA=public
DATABASE_SYNCHRONIZE=true

#DB
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

## Running Docker

PostgreSQL Docker 환경

```bash
# 실행
$ docker-compose up -d
# 종료
$ docker-compose down
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
