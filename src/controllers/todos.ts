import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/todo";

let todos: Todo[] = [];

type RequestBody = { text: string };
type RequestParams = { todoId: string };

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ todos: todos });
};

export const createToDo = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const text: string = body.text;
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
};

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  const targetTodoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (targetTodoIndex >= 0) {
    todos[targetTodoIndex]["text"] = body.text;
    return res.status(200).json({
      message: `To Do with id ${todoId} updated successfully!`,
      todo: todos[targetTodoIndex],
      todos: todos,
    });
  }
  res.status(404).json({ message: `No Todo found with id ${todoId}` });
};

export const deleteToDo = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  const updatedTodos = todos.filter((todo) => todo.id !== todoId);
  todos = updatedTodos;
  res.status(200).json({
    message: `Todo with id ${todoId} deleted successfully!`,
    todos: todos,
  });
};
