import ApiError from "./ErrorController";
import { Request, Response, NextFunction } from "express";
import Reaction from "../models/Reaction";

class ReactionController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const reaction: any = await Reaction.create({
        name: req.body.name
      })
      res.status(201).send(reaction);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Reactions = await Reaction.findAll();
      res.status(200).send(Reactions);
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const reaction = await Reaction.findOne({where: {id: req.body.id}});
      if (!reaction) {
        return next(ApiError.notFound("Such Reaction does not exist"))
      }
      res.status(200).send(reaction);
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const reaction = await Reaction.findOne({where: {id: req.body.id}});
      if (!reaction) {
        return next(ApiError.notFound("Such Reaction does not exist"))
      }
      reaction.update(req.body);
      res.status(200).send(reaction);
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const reaction = await Reaction.findOne({where: {id: req.body.id}});
      if (!reaction) {
        return next(ApiError.notFound("Such Reaction does not exist"))
      }
      reaction.destroy();
      res.status(200).send(reaction);
    } catch (e) {
      return next(e);
    }
  }
}

export default new ReactionController();