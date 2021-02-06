"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const text = body.text;
    const newTodo = {
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
router.put("/todo/:todoId", (req, res, next) => {
    const body = req.body;
    const params = req.params;
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
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    todos = updatedTodos;
    res.status(200).json({
        message: `Todo with id ${todoId} deleted successfully!`,
        todos: todos,
    });
});
exports.default = router;
