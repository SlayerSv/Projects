import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import ApiError from "./ErrorController";
import User from "../models/User";
import ReactionPost from "../models/ReactionPost";
import ReactionComment from "../models/ReactionComment";
import Reaction from "../models/Reaction";
import Post from "../models/Post";
import Category from "../models/Category";
import Comment from "../models/Comment";

import type { Request, Response, NextFunction } from "express";

class PostController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      const userId = user.id;
      const {title, content, categories} = req.body;
      if (!title || !content || !categories) {
        return next(ApiError.notFound("Required values were not provided"));
      }
      const categoryModels = await Category.findAll({where: {
        id: {
          [Op.or]: [categories]
        },
      }})
      if (!categoryModels) {
        return next(ApiError.notFound("Such category does not exist"));
      }
      const post = await Post.create({
        title,
        content,
        userId
      })
      post.addCategories(categoryModels);
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
        where: {
          id: req.params.id,
        },
        attributes: ["id", "title", "content"],
        include: [
          {
            model: User,
            attributes: ["id", "name", "avatar"]
          },
          {
            model: Category,
            attributes: ["name"],
            through: {
              attributes: []
            }
          },
          {
            model: Comment,
            attributes: ["content"],
            include: [
              {
                model: User,
                attributes: ["id", "name", "avatar"]
              },
              {
                model: ReactionComment,
                attributes: ["id"],
                include: [
                  {
                    model: Reaction,
                    attributes: ["name"]
                  },
                  {
                    model: User,
                    attributes: ["id", "name", "avatar"]
                  }
                ]
              }
            ],
            limit: 20
          },
          {
            model: ReactionPost,
            attributes: ["id"],
            include: [
              {
                model: User,
                attributes: ["id", "name", "avatar"],
              },
              {
                model: Reaction,
                attributes: ["name"]
              }
            ]
          },
        ],
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
      const {id, title, content, categories} = req.body;
      const post = await Post.findOne({where: {id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      if (user.id != post.userId) {
        return next(ApiError.forbidden("You are not allowed to do that"))
      }
      post.update(req.body);
      if (categories) {
        //@ts-ignore
        post.setCategories(categories)
      }
      res.status(200).send(post);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.id;
      if (!id) {
        return next(ApiError.notFound("Pls provide a post id"))
      }
      const post = await Post.findOne({where: {id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("You need to signin to do that"));
      }
      const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      if (user.id != post.userId) {
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