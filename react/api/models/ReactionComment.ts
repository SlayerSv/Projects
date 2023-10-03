import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey } from "sequelize";
import User from "../models/User";
import Reaction from "../models/Reaction";
import Comment from "../models/Comment";

interface ReactionCommentModel extends Model<InferAttributes<ReactionCommentModel>, InferCreationAttributes<ReactionCommentModel>> {
  id: CreationOptional<number>,
  userId: ForeignKey<Number>,
  reactionId: ForeignKey<Number>,
  commentId: ForeignKey<Number>,
}

const ReactionComment = sequelize.define<ReactionCommentModel>(
  "reactionsComment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      },
      allowNull: false,
    },
    reactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Reaction,
        key: "id"
      },
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
        key: "id"
      },
      allowNull: false,
    }
  },
  {
    timestamps: false
  }
);

export default ReactionComment;