"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
router.get("/todos", todos_1.getTodos);
router.post("/todo", todos_1.createToDo);
router.put("/todo/:todoId", todos_1.updateTodo);
router.delete("/todo/:todoId", todos_1.deleteToDo);
exports.default = router;
