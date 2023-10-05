import ApiError from "./ErrorController";
import { Request, Response, NextFunction } from "express";
import ReactionComment from "../models/ReactionComment";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

class ReactionCommentController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = user.id;
      const {commentId, reactionId} = req.body;
      if (!userId || !commentId || !reactionId) {
        return next(ApiError.notFound("Required values were not provided"))
      }
      const prevReaction = await ReactionComment.findOne({where: {
        [Op.and]: [
          {userId},
          {commentId}
        ]
      }});

      if (prevReaction) {
        prevReaction.destroy();
        if (prevReaction.reactionId === reactionId) {
          return;
        }
      }

      const reactionComment: any = await ReactionComment.create({
        userId,
        commentId,
        reactionId
      })
      res.status(201).send(reactionComment);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const commentId = req.body.commentId;
      if (!commentId) {
        return next(ApiError.notFound("Pls provide commentId"))
      }
      const ReactionComments = await ReactionComment.findAll({where: {commentId}});
      res.status(200).send(ReactionComments);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, commentId, reactionId} = req.body;
      if (!userId || !commentId || !reactionId) {
        return next(ApiError.notFound("Required values were not provided"))
      }
      const reactionComment = await ReactionComment.findOne({where: {
        [Op.and] : [
          {userId},
          {commentId}
        ]
      }
      });
      if (!reactionComment) {
        return next(ApiError.notFound("Such ReactionComment does not exist"))
      }
      reactionComment.update(req.body);
      res.status(200).send(reactionComment);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, commentId} = req.body;
      if (!userId || !commentId) {
        return next(ApiError.notFound("Required values were not provided"))
      }
      const reactionComment = await ReactionComment.findOne({where: {
        [Op.and] : [
          {userId},
          {commentId}
        ]
      }
      });
      if (!reactionComment) {
        return next(ApiError.notFound("Such ReactionComment does not exist"))
      }
      reactionComment.destroy();
      res.status(200).send(reactionComment);
    } catch (e) {
      return next(e);
    }
  }
}

export default new ReactionCommentController();