import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey } from "sequelize";
import User from "../models/User";
import Reaction from "../models/Reaction";
import Post from "../models/Post";

interface ReactionPostModel extends Model<InferAttributes<ReactionPostModel>, InferCreationAttributes<ReactionPostModel>> {
  id: CreationOptional<number>,
  userId: ForeignKey<Number>,
  reactionId: ForeignKey<Number>,
  postId: ForeignKey<Number>,
}

const ReactionPost = sequelize.define<ReactionPostModel>(
  "reactionsPost",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: false,
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
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: Reaction,
        key: "id"
      },
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "id"
      },
      allowNull: false,
    }
  },
  {
    timestamps: false
  }
);

export default ReactionPost;