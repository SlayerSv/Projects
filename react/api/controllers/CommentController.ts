import ApiError from "./ErrorController";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Comment from "../models/Comment";

class CommentController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = user.id;
      const {content, postId} = req.body;
      if (!content || !postId) {
        return next(ApiError.notFound("Required values were not provided"))
      }
      const comment = await Comment.create({
        content,
        userId,
        postId
      })
      res.status(201).send(comment);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.body;
      if (!postId) {
        return next(ApiError.notFound("Required values were not provided"));
      }
      const comments = await Comment.findAll({where: {postId}});
      res.status(200).send(comments);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = user.id;
      const {id} = req.body;
      if (!id) {
        return next(ApiError.notFound("Pls provide an id of the comment"));
      }
      const comment = await Comment.findOne({where: {id}});
      if (!comment) {
        return next(ApiError.notFound("Such comment does not exist"))
      }
      if (comment.userId != userId) {
        return next(ApiError.forbidden("You are not allowed to do that"));
      }
      comment.update(req.body);
      res.status(200).send(comment);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = user.id;
      const {id} = req.body;
      if (!id) {
        return next(ApiError.notFound("Pls provide an id of the comment"));
      }
      const comment = await Comment.findOne({where: {id}});
      if (!comment) {
        return next(ApiError.notFound("Such comment does not exist"))
      }
      if (comment.userId != userId) {
        return next(ApiError.forbidden("You are not allowed to do that"));
      }
      comment.destroy();
      res.status(200).send(comment);
    } catch (e) {
      return next(e);
    }
  }
}

export default new CommentController();