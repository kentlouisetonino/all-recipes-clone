## Description
> A computer program that will allow you to check different recipes. You can also post your own recipe and share it to other users. The app will allow you to like the recipes you have interest with.

> **Link**: [Frontend Repository](https://github.com/kentlouisetonino/all-recipes-clone-frontend)

<br />

## Technology Stack
> RestAPI • JWT • NestJS • TypesScript • NodeJS • TypeORM • MySQL • Docker

<br />

## Setup
> - Create a `.env` file in the root directory and put the key value pair.
```bash
AUTH_JWT_SECRET=’jwtTest123456’
AUTH_PASSWORD_SECRET=’passwordTest123456’
DB_HOST=’localhost’
DB_PORT=3310
DB_NAME=’allrecipesclone’
DB_USER=’root’
DB_ROOT_PASSWORD=’root’
PORT=11000
```

> - Run the following commands.
```bash
npm install or npm install –force
docker-compose up --build -d
npm run migration:run
npm run start:dev
npm run test:watch # For unit tests.
```

> - Connecting dockerize database to a database client (Workbench, DBeaver).
```bash
Server Host: localhost
Port: 3310
Database: allrecipesclone
Username: root
Password: root
```

<br />

## Recording
[Test.webm](https://user-images.githubusercontent.com/69438999/191136151-5e1e6f96-2862-4fb2-9d1e-604063b5d6de.webm)
