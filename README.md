# RS School - NodeJS Course - 2021 Q4

## Task 9. REST service - Authentication and JWT

- [About](#about)
- [How to install and use](#how-to-install-and-use)
- [Application operate with the following resources](#application-operate-with-the-following-resources)
- [Details](#details)
- [Logging](#logging)
- [Developer environment and instruments](#developer-environment-and-instruments)

### About
REST service application which used PostgreSQL database with TypeORM library, builded on Koa framework and containerized by Docker

Technical task
- [REST service](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/rest-service.md)
- [Typescript basics](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/typescript-basics.md)
- [Logging & Error Handling](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/logging-error-handling.md)
- [Docker basics](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/docker-basics.md)
- [PostgreSQL & Typeorm](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/postgresql-typeorm.md)
- [Authentication and JWT](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/auth-jwt.md)


### How to install and use
- Using Docker Compose
  1. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)
  2. Clone this repository
  3. Switch to **task_9_authentication_and_jwt** branch
  4. Command string for start REST service in Docker: `docker-compose up`
  5. Command string for tests (start app in docker image first): `docker container exec docker-basics-app npm run test:auth`
- Application starts on port 4000 by default
- After starting the app you can open in your browser OpenAPI documentation by typing `http://localhost:4000/doc/`

### Application operate with the following resources

- `User` (with attributes):
  ```javascript
  { id, name, login, password }
  ```
- `Board` (set of `columns`):
  ```javascript
  { id, title, columns }
  ```
- `Column` (set of tasks):
  ```javascript
   { id, title, order }
  ```
- `Task`:
  ```javascript
  {
    id,
    title,
    order,
    description,
    userId, //assignee
    boardId,
    columnId
  }
  ```

### Details

1. For `User`, `Board` and `Task` REST endpoints with separate router paths should be created
    * `User` (`/users` route)
      * `GET /users` - get all users (remove password from response)
      * `GET /users/:userId` - get the user by id (ex. “/users/123”) (remove password from response)
      * `POST /users` - create user
      * `PUT /users/:userId` - update user
      * `DELETE /users/:userId` - delete user
    * `Board` (`/boards` route)
      * `GET /boards` - get all boards
      * `GET /boards/:boardId` - get the board by id
      * `POST /boards` - create board
      * `PUT /boards/:boardId` - update board
      * `DELETE /boards/:boardId` - delete board
    * `Task` (`boards/:boardId/tasks` route)
      * `GET boards/:boardId/tasks` - get all tasks
      * `GET boards/:boardId/tasks/:taskId` - get the task by id
      * `POST boards/:boardId/tasks` - create task
      * `PUT boards/:boardId/tasks/:taskId` - update task
      * `DELETE boards/:boardId/tasks/:taskId` - delete task

2. When somebody `DELETEs` `Board`, all its `Tasks` should be deleted as well.

3. When somebody `DELETEs` `User`, all `Tasks` where `User` is assignee should be updated to put `userId = null`.

### Logging
The App implements a Logging service. Logging supports multiple logging levels and store logging level in environment variable.

Three levels of logging are supported:
- `error`
- `warn`
- `info`

To define max logging level set variable `LOGGING_LEVEL` in the `.env` file.
- Events with defined in `.env` logging level are logging to `Console` and file `./logs/common.log`
- Events with level error are logging to the file `./logs/error.log` too
- `uncaughtException` and `unhandledRejection` events are logging with level `error`


### Developer environment and instruments
- Node 16.13.0
- JWT Authorization
- TypeScript 4.5.2
- Koa 2.13.4 - web framework for Node.js
- PostgreSQL DB
- TypeORM
- Docker
- Jest 27.3.1
- Supertest 6.1.6
- Winston 3.3.3 - logging library
- ESLint 8.3.0
- TSDoc 0.0.4
- Npm 8.1.0