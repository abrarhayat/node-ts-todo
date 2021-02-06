import { Router } from "express";

import { Todo } from "../models/todos";

const router = Router();

const todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const text: string = req.body.text;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: text,
  };
  todos.push(newTodo);
  res.status(201).json({
    message: "To Do created successfully!",
    todo: newTodo,
    todos: todos,
  });
});

export default router;
