import sequelize from "../models/associations";
import ApiError from "./ErrorController";
import { Request, Response, NextFunction } from "express";

const Category = sequelize.models.Category;

class CategoryController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category: any = await Category.create({
        content: req.body.content,
        userId: req.body.userId,
      })
      res.status(201).send(category);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categorys = await Category.findAll();
      res.status(200).send(categorys);
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.findOne({where: {id: req.body.id}});
      if (!category) {
        return next(ApiError.notFound("Such category does not exist"))
      }
      res.status(200).send(category);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.findOne({where: {id: req.body.id}});
      if (!category) {
        return next(ApiError.notFound("Such category does not exist"))
      }
      category.update(req.body);
      res.status(200).send(category);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.findOne({where: {id: req.body.id}});
      if (!category) {
        return next(ApiError.notFound("Such category does not exist"))
      }
      category.destroy();
      res.status(200).send(category);
    } catch (e) {
      return next(e);
    }
  }
}

export default new CategoryController();