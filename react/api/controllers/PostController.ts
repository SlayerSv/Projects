import ApiError from "./ErrorController";
import jwt from "jsonwebtoken";
import Post from "../models/Post";
import Category from "../models/Category";
import Comment from "../models/Comment";
import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import User from "../models/User";
import ReactionPost from "../models/ReactionPost";
import ReactionComment from "../models/ReactionComment";
import sequelize from "../db";
import Reaction from "../models/Reaction";

class PostController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {title, content, userId, categoryIds} = req.body;
      if (!title || !content || !categoryIds || !userId) {
        return next(ApiError.notFound("Required values were not provided"));
      }
      const categories = await Category.findAll({where: {
        id: {
          [Op.or]: [categoryIds]
        },
      }})
      if (!categories) {
        return next(ApiError.notFound("Such category does not exist"));
      }
      const post: any = await Post.create({
        title,
        content,
        userId
      })
      post.addCategories(categories);
      res.status(201).send(post);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await Post.findAll({
        
      });
      res.status(200).send(posts);
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await Post.findOne({
        //group: ["ReactionComments.reactionId"],
        //subQuery: false,
        where: {
          id: req.params.id,
        },
        attributes: ["id"],
        include: [
          // {
          //   model: User,
          //   attributes: ["id", "name", "avatar"]
          // },
          // {
          //   model: Category,
          // },
            // {
            // model: Comment,
            // attributes: []}
          //   // @ts-ignore
          //   group: ["Comment.id", "ReactionComments.id", "ReactionComments.reactionId"],
          //   include: [
          //     // {
          //     //   model: User,
          //     //   attributes: ["id", "name", "avatar"]
          //     // },
          //     {
          //       model: ReactionComment,
          //       attributes: [[sequelize.fn("COUNT", sequelize.col("ReactionComments.reactionId")), "reactionCount"]],
                
          //     }
          //   ],
          //   limit: 20
          // },
          {
            model: ReactionPost,
            attributes: ["reactionId", [sequelize.fn("COUNT", sequelize.col("ReactionPosts.postId")), "reactionCount"]],
          },
        ],
        group: ["Post.id", "ReactionPosts.reactionId"],
        //raw: true,
        //nest: true
      });
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      res.status(200).send(post);
    } catch (e) {
      console.log(e)
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {id, title, content, categoryId} = req.body;
      const post: any = await Post.findOne({where: {id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      if (user.id !== post.UserId) {
        return next(ApiError.forbidden("You are not allowed to do that"))
      }
      post.update(req.body);
      res.status(200).send(post);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const post: any = await Post.findOne({where: {id: req.body.id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      if (user.id !== post.UserId) {
        return next(ApiError.forbidden("You are not allowed to do that"))
      }
      post.destroy();
      res.status(200).send(post);
    } catch (e) {
      return next(e);
    }
  }
}

export default new PostController();