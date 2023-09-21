import sequelize from "../db";

class UserController {
  async create(req, res) {
    sequelize.models.userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
  }
}