import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface ReactionModel extends Model<InferAttributes<ReactionModel>, InferCreationAttributes<ReactionModel>> {
  id: CreationOptional<number>,
  name: string
}

const Reaction = sequelize.define<ReactionModel>(
  "Reaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Reaction;