# 설명

설문조사 서버 어플리케이션

# 설치

```bash
$ npm install
```

# 환경변수

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

- Read

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

- Delete

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

### Delete

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

- Read

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

- Delete

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

Nest is [MIT licensed](LICENSE).
