# RS School - NodeJS Course - 2021 Q4

## Task 5. REST service - Typescript basics

### About
REST service application which used in-memory database and builded on Koa framework
- [Task page - Typescript basics](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/typescript-basics.md)

### How to install
- Install Node.js 16.13.0 or higher
- Clone this repository
- Switch to **task-5-typescript-basics** branch
- Install dependencies by command `npm i`

### How to use application and run tests
- Command string for start REST service: `npm run start`
- Command string for tests: `npm run test`
- After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing `http://localhost:4000/doc/`

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

### Developer environment and instruments
- Node 16.13.0
- TypeScript 4.5.2
- Npm 8.1.0
- Koa 2.13.4 - web framework for Node.js
- Jest 27.3.1
- Supertest 6.1.6
- ESLint 8.3.0
- TSDoc 0.0.4