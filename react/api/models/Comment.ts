import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey } from "sequelize";
import User from "./User";
import Post from "./Post";

interface CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>> {
  id: CreationOptional<number>,
  content: string,
  userId: ForeignKey<Number>,
  postId: ForeignKey<Number>,
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id"
      }
    }
  }
);

export default Comment;