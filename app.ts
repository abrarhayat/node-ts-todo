import express from "express";
import bodyparser from "body-parser";

import toDosRouter from "./routes/todos";

const app = express();
app.use(bodyparser.json());
app.use(toDosRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("Application started in port 8080");
});
