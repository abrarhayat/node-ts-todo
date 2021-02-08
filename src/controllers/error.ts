import { NextFunction, Request, Response } from "express";
const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  console.log(err);
  res.status(500).json({ message: "Internal Server Error!" });
};

export default handleError;
