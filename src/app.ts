import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";

import toDosRouter from "./routes/todos";
import errorHandler from "./controllers/error";

const app = express();
app.use(bodyparser.json());
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
