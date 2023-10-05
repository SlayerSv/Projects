import ApiError from "../controllers/ErrorController";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.log(error.message);
  
  if (error instanceof ApiError) {
    return res.status(error.status).json({message: error.message});
  }
  return res.status(500).json({message: error.message});
}