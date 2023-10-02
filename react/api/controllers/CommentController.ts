import sequelize from "../models/associations";
import ApiError from "./ErrorController";
import { Request, Response, NextFunction } from "express";

const Comment = sequelize.models.Comment;

class CommentController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const comment: any = await Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: req.body.postId
      })
      res.status(201).send(comment);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await Comment.findAll({where: {postId: req.body.postId}});
      res.status(200).send(comments);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await Comment.findOne({where: {id: req.body.id}});
      if (!comment) {
        return next(ApiError.notFound("Such comment does not exist"))
      }
      comment.update(req.body);
      res.status(200).send(comment);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await Comment.findOne({where: {id: req.body.id}});
      if (!comment) {
        return next(ApiError.notFound("Such comment does not exist"))
      }
      comment.destroy();
      res.status(200).send(comment);
    } catch (e) {
      return next(e);
    }
  }
}

export default new CommentController();