import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface ReactionCommentModel extends Model<InferAttributes<ReactionCommentModel>, InferCreationAttributes<ReactionCommentModel>> {
  id: CreationOptional<number>
}

const ReactionComment = sequelize.define<ReactionCommentModel>(
  "ReactionComment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
  }
);

export default ReactionComment;