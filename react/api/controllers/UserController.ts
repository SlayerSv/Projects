import sequelize from "../db";
import ApiError from "./ErrorController";

const User = sequelize.models.userModel;

class UserController {

  async create(req: any, res: any, next: any) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      });
      res.status(201).send(user);
    } catch (e) {
      return next(e);
    }
  }

  async getUser(req: any, res: any, next: any) {
    try {
      const user = await User.findOne({where: {id: req.body.userId}});
      if (!user) {
        return next(ApiError.notFound("Such user does not exist"));
      }
      res.status(200).send(user);
    } catch (e) {
      return next(e);
    }
  }
}