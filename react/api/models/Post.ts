import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, BelongsToManyAddAssociationsMixin } from "sequelize";
import User from "./User";
import {CategoryModel} from "./Category";
export interface PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
  id: CreationOptional<number>,
  title: string,
  content: string,
  poster: string | null,
  userId: ForeignKey<number>,
  addCategories: BelongsToManyAddAssociationsMixin<CategoryModel, CategoryModel["id"]>
}

const Post = sequelize.define<PostModel>("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  }
});

export default Post;