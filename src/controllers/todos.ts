import { NextFunction, Request, Response } from "express";
import Todo, { TodoDocumentInterface } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos: todos });
  } catch (err) {
    next(err);
  }
};

export const createToDo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as RequestBody;
    const text: string = body.text;
    const newTodo: TodoDocumentInterface = new Todo({
      text: text,
    });
    await newTodo.save();
    const updatedTodos = await Todo.find();
    res.status(201).json({
      message: "To Do created successfully!",
      todo: newTodo,
      todos: updatedTodos,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as RequestBody;
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const updatedTodo: TodoDocumentInterface | null = await Todo.findOne({
      _id: todoId,
    });
    if (updatedTodo) {
      updatedTodo.$set("text", body.text);
      await updatedTodo.save();
      const updatedTodos = await Todo.find();
      return res.status(200).json({
        message: `To Do with id ${todoId} updated successfully!`,
        todo: updatedTodo,
        todos: updatedTodos,
      });
    }
    res.status(404).json({ message: `No Todo found with id ${todoId}` });
  } catch (err) {
    next(err);
  }
};

export const deleteToDo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const result: TodoDocumentInterface | null = await Todo.findByIdAndDelete({
      _id: todoId,
    });
    if (result) {
      const updatedTodos = await Todo.find();
      return res.status(200).json({
        message: `Todo with id ${todoId} deleted successfully!`,
        todos: updatedTodos,
      });
    }
    res.status(404).json({ message: `No Todo found with id ${todoId}` });
  } catch (err) {
    next(err);
  }
};
