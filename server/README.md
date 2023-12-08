# 🛎️ User Service
The user's service manages users and also to which tenant they belong.
New users and tenants can be created and existing ones can be updated or deleted.

## 🛠️ **DEVELOPMENT**

- This project uses [yarn](https://classic.yarnpkg.com/lang/en/docs/install/): `npm install --global yarn`

- Install [``Postgresql``](https://www.postgresql.org/download/) & update server config defined in [`.env`](./.env) file.

### 📀 Setup


Install dependencies and push and seed the database schema:

```bash
yarn install
npx prisma db push
npx prisma db seed
```

### ▶️ Build & run the Server

Start the server on [http://localhost:3000/](http://localhost:3000/)

> yarn start

### ▶️ Deploy

Build the node package

> yarn build

### ⚓Git Hooks
Git Hooks are configured using [Husky](https://github.com/typicode/husky) automatically in `yarn install`:

- before each commit, all files that are staged are formatted based on linting rules
- this is done using [lint-staged](https://github.com/okonet/lint-staged)


### 📝 Linting
Linting is configured using [ESLint](https://eslint.org/) (Linting rules) in combination with [Prettier](https://prettier.io/) (enforce linting rules through formatting).

- To run linting: `yarn lint`
- To run source code formatting: `yarn format`

---

## 🔎 **TESTING**
- Unit test: `yarn test:unit`
- Integration tests: `yarn test:integration`

