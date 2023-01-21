# 설명

설문조사 서버 어플리케이션

스키마 : [ERD_CLOUD_LINK](https://www.erdcloud.com/d/gnDoZaNLSBP4isJce)

# 설치

```bash
$ npm install
```

# 환경변수

루트경로에 .env 파일 추가

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

# 도커 실행

PostgreSQL Docker 환경

```bash
# 실행
$ docker-compose up -d
# 종료
$ docker-compose down
```

# 서버 실행

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# API

- 유저생성(createUser) -> 설문지 응시(answerSurvey)를 진행해야
  답변 및 설문 완료, 설문 완료 확인 과정을 진행할수 있습니다!

## 유저

### 유저 생성

```graphql
mutation {
  createUser(createUserInput: { name: "테스트유저" }) {
    id
    name
  }
}
```

Response

```JSON
{
  "data": {
    "createUser": {
      "id": 1,
      "name": "테스트유저"
    }
  }
}
```

### 설문지 응시

```graphql
mutation {
  answerSurvey(answerSurveyInput: { userId: 1, surveyId: 1 }) {
    id
    userId
    surveyId
    isDone
  }
}
```

Response

```json
{
  "data": {
    "answerSurvey": {
      "id": 3,
      "userId": 1,
      "surveyId": 1,
      "isDone": false
    }
  }
}
```

## 설문지 CRUD

### Create

설문지 작성

```graphql
mutation {
  createSurvey(
    creatSurveyInput: {
      title: "설문지 테스트 타이틀"
      description: "설문지 테스트 설명"
      footer: "설문지 테스트 푸터"
    }
  ) {
    id
    title
    description
    footer
  }
}
```

Response

```json
{
  "data": {
    "createSurvey": {
      "id": 1,
      "title": "설문지 테스트 타이틀",
      "description": "설문지 테스트 설명",
      "footer": "설문지 테스트 푸터"
    }
  }
}
```

### Read

설문지 가져오기(by surveyId)

```graphql
query {
  survey(id: 1) {
    id
    title
    description
    footer
    questions {
      id
      questionContent
      allowMultipleAnswers
      order
      questionOptions {
        id
        optionContent
        score
        order
      }
    }
  }
}
```

Response

```json
{
  "data": {
    "survey": {
      "id": 1,
      "title": "설문지 테스트 타이틀",
      "description": "설문지 테스트 설명",
      "footer": "설문지 테스트 푸터",
      "questions": [
        {
          "id": 1,
          "questionContent": "테스트 질문",
          "allowMultipleAnswers": false,
          "order": 0,
          "questionOptions": [
            {
              "id": 1,
              "optionContent": "테스트선택지",
              "score": 1,
              "order": 0
            }
          ]
        }
      ]
    }
  }
}
```

### Update

설문지 수정

```graphql
mutation {
  updateSurvey(
    updateSurveyInput: {
      surveyId: 1
      title: "수정된 테스트 설문지"
      description: "수정된 테스트 설명"
      footer: "수정된 푸터"
    }
  ) {
    id
    title
    description
    footer
    questions {
      id
      questionContent
      allowMultipleAnswers
      order
      questionOptions {
        id
        optionContent
        score
        order
      }
    }
  }
}
```

Response

```json
{
  "data": {
    "updateSurvey": {
      "id": 1,
      "title": "수정된 테스트 설문지",
      "description": "수정된 테스트 설명",
      "footer": "수정된 푸터",
      "questions": [
        {
          "id": 1,
          "questionContent": "테스트 질문",
          "allowMultipleAnswers": false,
          "order": 0,
          "questionOptions": [
            {
              "id": 1,
              "optionContent": "테스트선택지",
              "score": 1,
              "order": 0
            }
          ]
        }
      ]
    }
  }
}
```

### Delete

설문지 삭제

```graphql
mutation {
  deleteSurvey(id: 1)
}
```

Response

```json
{
  "data": {
    "deleteSurvey": "Success"
  }
}
```

## 문항 CRUD

### Create

문항작성

```graphql
mutation {
  createQuestion(
    createQuestionInput: {
      questionContent: "테스트 질문"
      allowMultipleAnswers: false
      surveyId: 1
    }
  ) {
    id
    questionContent
    allowMultipleAnswers
    surveyId
    order
  }
}
```

Response

```json
{
  "data": {
    "createQuestion": {
      "id": 1,
      "questionContent": "테스트 질문",
      "allowMultipleAnswers": false,
      "surveyId": 1,
      "order": 0
    }
  }
}
```

### Read

문항 가져오기 (by questionId)

```graphql
query {
  question(id: 1) {
    id
    surveyId
    allowMultipleAnswers
    order
    questionContent
    questionOptions {
      id
      optionContent
      score
      order
    }
  }
}
```

Response

```json
{
  "data": {
    "question": {
      "id": 1,
      "surveyId": 1,
      "allowMultipleAnswers": false,
      "order": 0,
      "questionContent": "테스트 질문",
      "questionOptions": [
        {
          "id": 1,
          "optionContent": "테스트선택지",
          "score": 1,
          "order": 0
        }
      ]
    }
  }
}
```

### Update

문항 수정

```graphql
mutation {
  updateQuestion(
    updateQuestionInput: {
      questionId: 1
      questionContent: "수정된 질문 내용"
      allowMultipleAnswers: true
    }
  ) {
    id
    surveyId
    allowMultipleAnswers
    order
    questionContent
    questionOptions {
      id
      optionContent
      score
      order
    }
  }
}
```

Response

```json
{
  "data": {
    "updateQuestion": {
      "id": 1,
      "surveyId": 1,
      "allowMultipleAnswers": true,
      "order": 0,
      "questionContent": "수정된 질문 내용",
      "questionOptions": [
        {
          "id": 1,
          "optionContent": "테스트선택지",
          "score": 1,
          "order": 0
        }
      ]
    }
  }
}
```

문항 순서 변경

- nextQuestionId
  순서를 맨 뒤로 옮겨야 할때는 null을 보냅니다.
  null이 아닐때는 nextQuestionId에 해당하는 데이터의 order 앞으로 옮깁니다.

```graphql
mutation {
  updateQuestionOrder(
    updateQuestionOrderInput: { curQuestionId: 2, nextQuestionId: null }
  ) {
    id
    order
  }
}
```

Response

```json
{
  "data": {
    "updateQuestionOrder": [
      {
        "id": 3,
        "order": 7
      },
      {
        "id": 4,
        "order": 10
      },
      {
        "id": 5,
        "order": 12
      },
      {
        "id": 2,
        "order": 13
      }
    ]
  }
}
```

### Delete

문항 삭제

```graphql
mutation {
  deleteQuestion(id: 1)
}
```

Response

```json
{
  "data": {
    "deleteQuestion": "Success"
  }
}
```

## 선택지 CRUD

### Create

선택지 작성

```graphql
mutation {
  createQuestionOption(
    createQuestionOptionInput: {
      optionContent: "테스트선택지"
      score: 1
      questionId: 1
    }
  ) {
    id
    optionContent
    score
    questionId
    order
  }
}
```

Response

```json
{
  "data": {
    "createQuestionOption": {
      "id": 1,
      "optionContent": "테스트선택지",
      "score": 1,
      "questionId": 1,
      "order": 0
    }
  }
}
```

### Read

선택지 가져오기 (by questionOptionId)

```graphql
query {
  questionOption(id: 1) {
    id
    optionContent
    order
    score
  }
}
```

Response

```json
{
  "data": {
    "questionOption": {
      "id": 1,
      "optionContent": "테스트선택지",
      "order": 0,
      "score": 1
    }
  }
}
```

### Update

선택지 수정

```graphql
mutation {
  updateQuestionOption(
    updateQuestionOptionInput: {
      optionContent: "수정된 선택지"
      questionOptionId: 1
      score: 2
    }
  ) {
    id
    optionContent
    score
    questionId
  }
}
```

Response

```json
{
  "data": {
    "updateQuestionOption": {
      "id": 1,
      "optionContent": "수정된 선택지",
      "score": 2,
      "questionId": 1
    }
  }
}
```

선택지 순서 변경

- nextQuestionOptionId
  순서를 맨 뒤로 옮겨야 할때는 값을 보내지 않거나 null을 보냅니다.
  null이 아닐때는 nextQuestionOptionId에 해당하는 데이터의 order 앞으로 옮깁니다.

```graphql
mutation {
  updateQuestionOptionOrder(
    updateQuestionOptionOrderInput: {
      curQuestionOptionId: 3
      nextQuestionOptionId: 5
    }
  ) {
    id
    order
    score
    optionContent
  }
}
```

Response

```json
{
  "data": {
    "updateQuestionOptionOrder": [
      {
        "id": 4,
        "order": 2,
        "score": 3,
        "optionContent": "테스트선택지2"
      },
      {
        "id": 3,
        "order": 4,
        "score": 2,
        "optionContent": "테스트선택지2"
      },
      {
        "id": 5,
        "order": 5,
        "score": 4,
        "optionContent": "테스트선택지2"
      },
      {
        "id": 6,
        "order": 8,
        "score": 6,
        "optionContent": "테스트선택지2"
      }
    ]
  }
}
```

### Delete

선택지 삭제

```graphql
mutation {
  deleteQuestionOption(id: 1)
}
```

Response

```json
{
  "data": {
    "deleteQuestionOption": "Success"
  }
}
```

## 답변 CRUD

### Create

답변 작성

```graphql
mutation {
  createAnswer(
    createAnswerInput: {
      questionId: 1
      userSurveyId: 3
      questionOptionIds: [1]
    }
  ) {
    id
    userSurveyId
    questionId
    answerOptions {
      id
      answerId
      questionOptionId
      questionOption {
        id
        order
        optionContent
      }
    }
  }
}
```

Response

```json
{
  "data": {
    "createAnswer": {
      "id": 1,
      "userSurveyId": 3,
      "questionId": 1,
      "answerOptions": [
        {
          "id": 1,
          "answerId": 1,
          "questionOptionId": 1,
          "questionOption": null
        }
      ]
    }
  }
}
```

### Read

답변가져오기 (by answerId)

```graphql
query {
  answer(id: 1) {
    id
    questionId
    answerOptions {
      id
      questionOptionId
      questionOption {
        id
        optionContent
        order
        score
      }
    }
  }
}
```

Response

```json
{
  "data": {
    "answer": {
      "id": 1,
      "questionId": 1,
      "answerOptions": [
        {
          "id": 1,
          "questionOptionId": 1,
          "questionOption": null
        }
      ]
    }
  }
}
```

### Update

답변 수정

```graphql
mutation {
  updateAnswer(updateAnswerInput: { answerId: 1, questionOptionIds: [1, 2] }) {
    id
    userSurveyId
    questionId
    answerOptions {
      id
      answerId
      questionOptionId
    }
  }
}
```

Response

```json
{
  "data": {
    "updateAnswer": {
      "id": 1,
      "userSurveyId": 3,
      "questionId": 1,
      "answerOptions": [
        {
          "id": 1,
          "answerId": 1,
          "questionOptionId": 1
        },
        {
          "id": 2,
          "answerId": 1,
          "questionOptionId": 2
        }
      ]
    }
  }
}
```

### Delete

답변 삭제

```graphql
mutation {
  deleteAnswer(id: 1)
}
```

Response

```json
{
  "data": {
    "deleteAnswer": "Success"
  }
}
```

## 설문지 완료

```graphql
mutation {
  completeSurvey(userSurveyId: 1) {
    isDone
    inCompletedQuestionIds
  }
}
```

Response

```json
{
  "data": {
    "completeSurvey": {
      "isDone": false,
      "inCompletedQuestionIds": [1]
    }
  }
}
```

## 완료된 설문지 확인

```graphql
query {
  surveyResult(userSurveyId: 1) {
    sumScore
    survey {
      id
      title
      description
      questions {
        id
        questionContent
        order
        questionOptions {
          id
          optionContent
          order
          score
        }
      }
    }
    answers {
      id
      answerOptions {
        id
        questionOptionId
        questionOption {
          id
          optionContent
          order
          score
        }
      }
    }
  }
}
```

Response

```json
{
  "data": {
    "surveyResult": {
      "sumScore": 2,
      "survey": {
        "id": 1,
        "title": "수정된 테스트 설문지",
        "description": "수정된 테스트 설명",
        "questions": [
          {
            "id": 1,
            "questionContent": "수정된 질문 내용",
            "order": 0,
            "questionOptions": [
              {
                "id": 1,
                "optionContent": "수정된 선택지",
                "order": 0,
                "score": 2
              },
              {
                "id": 2,
                "optionContent": "테스트선택지2",
                "order": 1,
                "score": 2
              }
            ]
          }
        ]
      },
      "answers": [
        {
          "id": 2,
          "answerOptions": [
            {
              "id": 4,
              "questionOptionId": 1,
              "questionOption": {
                "id": 1,
                "optionContent": "수정된 선택지",
                "order": 0,
                "score": 2
              }
            }
          ]
        }
      ]
    }
  }
}
```

# License

Nest is MIT licensed.
