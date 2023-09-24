import sequelize from "../models/associations";
import ApiError from "./ErrorController";

const Post = sequelize.models.Post;
const Category = sequelize.models.Category;

class PostController {

  async create(req: any, res: any, next: any) {
    try {
      const category = await Category.findOne({where: {id: req.body.categoryId}})
      if (!category) {
        return next(ApiError.notFound("Such category does not exist"));
      }
      const post: any = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
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
      const post = await Post.findOne({where: {id: req.body.id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      post.update(req.body);
      res.status(200).send(post);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: any, res: any, next: any) {
    try {
      const post = await Post.findOne({where: {id: req.body.id}});
      if (!post) {
        return next(ApiError.notFound("Such post does not exist"))
      }
      post.destroy();
      res.status(200).send(post);
    } catch (e) {
      return next(e);
    }
  }
}

export default new PostController();