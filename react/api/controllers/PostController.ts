import sequelize from "../models/associations";
import ApiError from "./ErrorController";
import jwt from "jsonwebtoken";

const Post = sequelize.models.Post;
const Category = sequelize.models.Category;

class PostController {

  async create(req: any, res: any, next: any) {
    try {
      const {title, content, UserId, categoryId} = req.body;
      if (!title || !content || !categoryId || !UserId) {
        return next(ApiError.notFound("Required values were not provided"));
      }
      const category = await Category.findOne({where: {id: categoryId}})
      if (!category) {
        return next(ApiError.notFound("Such category does not exist"));
      }
      const post: any = await Post.create({
        title,
        content,
        UserId,
      })
      post.addCategory(category, {through: sequelize.models.PostCategories})
      res.status(201).send(post);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: any, res: any, next: any) {
    try {
      const posts = await Post.findAll();
      res.status(200).send(posts);
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req: any, res: any, next: any) {
    try {
      const post = await Post.findOne({where: {id: req.body.id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      res.status(200).send(post);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: any, res: any, next: any) {
    try {
      const {id, title, content, categoryId} = req.body;
      const post:any = await Post.findOne({where: {id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      const token = req.headers.authorization.split(" ")[1];
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

  async delete(req: any, res: any, next: any) {
    try {
      const post: any = await Post.findOne({where: {id: req.body.id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      const token = req.headers.authorization.split(" ")[1];
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