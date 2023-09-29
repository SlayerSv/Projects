import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface ReactionPostModel extends Model<InferAttributes<ReactionPostModel>, InferCreationAttributes<ReactionPostModel>> {
  id: CreationOptional<number>
}

const ReactionPost = sequelize.define<ReactionPostModel>("ReactionPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
});

export default ReactionPost;