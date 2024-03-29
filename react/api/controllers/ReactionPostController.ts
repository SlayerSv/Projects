import ApiError from "./ErrorController";
import { Request, Response, NextFunction } from "express";
import ReactionPost from "../models/ReactionPost";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

class ReactionPostController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = user.id;
      const {postId, reactionId} = req.body;
      if (!userId || !postId || !reactionId) {
        return next(ApiError.notFound("Required values were not provided"));
      }
      const prevReaction = await ReactionPost.findOne({where: {
        [Op.and]: [
          {userId},
          {postId}
        ]
      }});

      if (prevReaction) {
        prevReaction.destroy();
        if (prevReaction.reactionId === reactionId) {
          return;
        }
      }

      const reactionPost: any = await ReactionPost.create({
        userId,
        postId,
        reactionId
      })
      res.status(201).send(reactionPost);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.body.postId;
      if (!postId) {
        return next(ApiError.notFound("Pls provide postId"))
      }
      const ReactionPosts = await ReactionPost.findAll({where: {postId}});
      res.status(200).send(ReactionPosts);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, postId, reactionId} = req.body;
      if (!userId || !postId || !reactionId) {
        return next(ApiError.notFound("Required values were not provided"))
      }
      const reactionPost = await ReactionPost.findOne({where: {
        [Op.and] : [
          {userId},
          {postId}
        ]
      }
      });
      if (!reactionPost) {
        return next(ApiError.notFound("Such ReactionPost does not exist"))
      }
      reactionPost.update(req.body);
      res.status(200).send(reactionPost);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, postId} = req.body;
      if (!userId || !postId) {
        return next(ApiError.notFound("Required values were not provided"))
      }
      const reactionPost = await ReactionPost.findOne({where: {
        [Op.and] : [
          {userId},
          {postId}
        ]
      }
      });
      if (!reactionPost) {
        return next(ApiError.notFound("Such ReactionPost does not exist"))
      }
      reactionPost.destroy();
      res.status(200).send(reactionPost);
    } catch (e) {
      return next(e);
    }
  }
}

export default new ReactionPostController();