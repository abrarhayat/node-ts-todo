"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const text = req.body.text;
    const newTodo = {
        id: new Date().toISOString(),
        text: text,
    };
    todos.push(newTodo);
    res
        .status(201)
        .json({
        message: "To Do created successfully!",
        todo: newTodo,
        todos: todos,
    });
});
exports.default = router;
