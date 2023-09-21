import sequelize from "../models/associations";

class PostController {
  async create(req: any, res: any) {
    const post: any = await sequelize.models.Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    })
    const category = await sequelize.models.Category.findOne({where: {name: req.body.category}})
    post.addCategory(category, {through: sequelize.models.PostCategories})
    res.status(201).send(post);
  }
  async getAll() {

  }
}

export default new PostController();