"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const todos_1 = __importDefault(require("./routes/todos"));
const error_1 = __importDefault(require("./controllers/error"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(todos_1.default);
app.use(error_1.default);
mongoose_1.default.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Application started on port ${port}`);
    });
});
