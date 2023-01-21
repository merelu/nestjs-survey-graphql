## 설명

설문조사 서버 어플리케이션

## 설치

```bash
$ npm install
```

## 환경변수

환경설정 루트경로에 .env 파일 추가

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=maum
DATABASE_NAME=maumlab
DATABASE_SCHEMA=public
DATABASE_SYNCHRONIZE=true

#DB
POSTGRES_USER=postgres
POSTGRES_PASSWORD=maum
POSTGRES_DB=maumlab
```

## 도커 실행

PostgreSQL Docker 환경

```bash
# 실행
$ docker-compose up -d
# 종료
$ docker-compose down
```

## 서버 실행

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API

### 설문지 CRUD

- Create

```graphql

```

- Read

```graphql

```

- Update

```graphql

```

- Delete

```graphql

```

### 문항 CRUD

- Create

```graphql

```

- Read

```graphql

```

- Update

```graphql

```

- Delete

```graphql

```

### 선택지 CRUD

- Create

```graphql

```

- Read

```graphql

```

- Update

```graphql

```

- Delete

```graphql

```

### 답변 CRUD

- Create

```graphql

```

- Read

```graphql

```

- Update

```graphql

```

- Delete

```graphql

```

### 설문지 완료

```graphql

```

### 완료된 설문지 확인

```graphql

```

## License

Nest is [MIT licensed](LICENSE).
