import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import toDosRouter from "./routes/todos";
import errorHandler from "./controllers/error";

const app = express();
app.use(bodyparser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request from ${req.headers.origin}`);
  res.setHeader("Access-Control-Allow-Origin", "*"); //allowing access to sending res to all websites
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); //we do this so that when an OPTIONS request is sent from the client,
    //we send a 200 status code resonse before reaching the gql middleware as gql accepts POST and GET requests
  }
  next();
});
app.use(toDosRouter);
app.use(errorHandler);

mongoose.connect(
  process.env.MONGO_DB_URI as string,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Application started on port ${port}`);
    });
  }
);
