import ApiError from "../controllers/ErrorController";

export default function errorHandler(error: Error, req: any, res: any, next: any) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({message: error.message});
  }
  return res.status(500).json({message: "Unhandled internal server error"});
}