import { Router } from "express";

import {
  getTodos,
  createToDo,
  updateTodo,
  deleteToDo,
} from "../controllers/todos";

const router = Router();

router.get("/", getTodos);

router.post("/todo", createToDo);

router.put("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteToDo);

export default router;
