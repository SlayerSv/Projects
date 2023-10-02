import ApiError from "../controllers/ErrorController";
import { Request, Response } from "express";

export default function errorHandler(error: Error, req: Request, res: Response) {
  console.log(error.message);
  
  if (error instanceof ApiError) {
    return res.status(error.status).json({message: error.message});
  }
  return res.status(500).json({message: "Unhandled internal server error"});
}