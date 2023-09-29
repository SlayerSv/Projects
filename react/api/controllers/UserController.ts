import ApiError from "./ErrorController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

class UserController {

  async create(name: string, email: string, password: string, avatar: string) {
    const user = await User.create({
      name,
      email,
      password,
      avatar
    });
    return user;
  }

  generateToken(id: string, email:string, name: string) {
    return jwt.sign(
      {id, email, name},
      process.env.JWT_SECRET_KEY as string,
      {expiresIn: "24h"}
    )
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
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

  async signup(req: Request, res: Response, next: NextFunction) {
    const {name, email, password, avatar} = req.body;
    try {
      if (!name || !email || !password) {
        return next(ApiError.notFound("required values are not provided"))
      }
      const candidate = await User.findOne({
        where: {
          [Op.or]: [
            {email},
            {name}
          ]
        }
      })
      if (candidate) {
        return next(ApiError.notFound("Such user already exists"));
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 5);
      const user = await this.create(name, email, hashedPassword, avatar)
      const accessToken = this.generateToken(user.id.toString(), user.email, user.name);
      res.status(201).send({accessToken});
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;
    try {
      if (!email || !password) {
        return next(ApiError.notFound("required values are not provided"))
      }
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        return next(ApiError.notFound("Such user does not exists"));
      }
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return next(ApiError.notFound("Wrong password"))
      }
      const accessToken = this.generateToken(user.id.toString(), user.email, user.name);
      res.status(200).send({accessToken});
    } catch (e) {
      console.log(e);
      next(e)
    }
  }

  async authorize() {

  }
}

export default new UserController();