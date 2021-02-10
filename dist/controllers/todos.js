"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.updateTodo = exports.createToDo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos: todos });
    }
    catch (err) {
        next(err);
    }
});
exports.getTodos = getTodos;
const createToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const text = body.text;
        const newTodo = new todo_1.default({
            text: text,
        });
        yield newTodo.save();
        const updatedTodos = yield todo_1.default.find();
        res.status(201).json({
            message: "To Do created successfully!",
            todo: newTodo,
            todos: updatedTodos,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createToDo = createToDo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const params = req.params;
        const todoId = params.todoId;
        const updatedTodo = yield todo_1.default.findOne({
            _id: todoId,
        });
        if (updatedTodo) {
            updatedTodo.$set("text", body.text);
            yield updatedTodo.save();
            const updatedTodos = yield todo_1.default.find();
            return res.status(200).json({
                message: `To Do with id ${todoId} updated successfully!`,
                todo: updatedTodo,
                todos: updatedTodos,
            });
        }
        res.status(404).json({ message: `No Todo found with id ${todoId}` });
    }
    catch (err) {
        next(err);
    }
});
exports.updateTodo = updateTodo;
const deleteToDo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        const todoId = params.todoId;
        const result = yield todo_1.default.findByIdAndDelete({
            _id: todoId,
        });
        if (result) {
            const updatedTodos = yield todo_1.default.find();
            return res.status(200).json({
                message: `Todo with id ${todoId} deleted successfully!`,
                todos: updatedTodos,
            });
        }
        res.status(404).json({ message: `No Todo found with id ${todoId}` });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteToDo = deleteToDo;
