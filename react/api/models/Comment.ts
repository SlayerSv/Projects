import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>> {
  id: CreationOptional<number>,
  content: string
}

const Comment = sequelize.define<CommentModel>(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

export default Comment;