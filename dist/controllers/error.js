"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = (err, req, res, next) => {
    const statusCode = 500;
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
};
exports.default = handleError;
