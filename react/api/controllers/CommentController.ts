import sequelize from "../models/associations";
import ApiError from "./ErrorController";

const Comment = sequelize.models.Comment;

class CommentController {

  async create(req: any, res: any, next: any) {
    try {
      const comment: any = await Comment.create({
        content: req.body.content,
        userId: req.body.userId,
      })
      res.status(201).send(comment);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: any, res: any, next: any) {
    try {
      const comments = await Comment.findAll();
      res.status(200).send(comments);
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req: any, res: any, next: any) {
    try {
      const comment = await Comment.findOne({where: {id: req.body.id}});
      if (!comment) {
        return next(ApiError.notFound("Such comment does not exist"))
      }
      res.status(200).send(comment);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: any, res: any, next: any) {
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

  async delete(req: any, res: any, next: any) {
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