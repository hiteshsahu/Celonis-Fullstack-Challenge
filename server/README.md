# 🛎️ User Service Server
The user's service manages users and also to which tenant they belong.
New users and tenants can be created and existing ones can be updated or deleted.

## 🛠️ **DEVELOPMENT**

- This project uses [yarn](https://classic.yarnpkg.com/lang/en/docs/install/): `npm install --global yarn`

- Install [``Postgresql``](https://www.postgresql.org/download/) & update the server config defined in the [`.env`](./.env) file.

### 📀 Setup

Install dependencies and push and seed the database schema:

> `yarn install` <br/>
> `npx prisma db push` <br/>
> `npx prisma db seed`


### ▶️ Build & run the Server

Start the server on [http://localhost:3000/](http://localhost:3000/)

> ``yarn start``

### ⚓ Git Hooks
Git Hooks are configured using [Husky](https://github.com/typicode/husky) automatically in `yarn install`:

- before each commit, all files that are staged are formatted based on linting rules
- this is done using [lint-staged](https://github.com/okonet/lint-staged)

### 📝 Linting
Linting is configured using [ESLint](https://eslint.org/) (Linting rules) in combination with [Prettier](https://prettier.io/) (enforce linting rules through formatting).

- To run linting: `yarn lint`
- To run source code formatting: `yarn format`

-----

## 🚀 **DEPLOYMENT**

Build a stand-alone node app

> `yarn build`

Building server image
>`` docker build -t user-service-server .`` 

Check the generated server image
> `docker images `

 Run server image
> `docker run -d -p 2222:8080 user-service-server`  

Check running server docker image
> `docker ps` 

Kill running server docker image
> `docker kill <CONTAINER ID>` 
---

## 🔎 **TESTING**
- Unit test: `yarn test:unit`
- Integration tests: `yarn test:integration`
