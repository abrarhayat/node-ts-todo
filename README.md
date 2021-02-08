# node-ts-todo

A demo To Do app written in TypeScript with Node Express and MongoDB

- For this to work, npm and TypeScript MUST be installed.
  More info on installation:
  [npm](https://www.npmjs.com/get-npm) | [TypeScript](https://www.typescriptlang.org/download)

  In the terminal, enter the following in the order:

- `npm install`
- `tsc`
- Create a new file in the project root directory named **nodemon.json**
- Inside the **nodemon.json** file, copy the following and fill up with a valid mongodb URI with the db name :

```
   {
   "env": {
   "PORT": 8000,
   "MONGO_DB_URI": "valid_mongo_db_uri"
    }
   }
```

More info: [Mongo DB Node JS Driver usage examples](https://docs.mongodb.com/drivers/node/usage-examples)

- Now, in the terminal, enter:
- `npm start`
- Server should now running with the endpoints in http://localhost:8000
