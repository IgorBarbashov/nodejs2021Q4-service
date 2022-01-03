# RS School - NodeJS Course - 2021 Q4

## Task 7. REST service - Docker basics

- [About](#about)
- [How to install](#how-to-install)
- [How to use application and run tests](#how-to-use-application-and-run-tests)
- [Application operate with the following resources](#application-operate-with-the-following-resources)
- [Details](#details)
- [Logging](#logging)
- [Developer environment and instruments](#developer-environment-and-instruments)

### About
REST service application which used in-memory database, builded on Koa framework and containerized by Docker

Technical task
- [REST service](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/rest-service.md)
- [Typescript basics](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/typescript-basics.md)
- [Logging & Error Handling](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/logging-error-handling.md)
- [Docker basics](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/docker-basics.md)


### How to install
- Install [Docker](https://www.docker.com/)
- Clone this repository
- Switch to **task_7_docker_basics** branch

### How to use application and run tests
- Command string for start REST service in Docker image: `docker-compose up`
- Application starts on port 4000 by default
- Command string for tests (started app in docker image is needed): `docker container exec docker-basics-app npm run test`
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
- Docker
- Node 16.13.0
- TypeScript 4.5.2
- Npm 8.1.0
- Koa 2.13.4 - web framework for Node.js
- Winston 3.3.3 - logging library
- Jest 27.3.1
- Supertest 6.1.6
- ESLint 8.3.0
- TSDoc 0.0.4