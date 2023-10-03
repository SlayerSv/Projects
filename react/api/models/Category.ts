import sequelize from "../db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

export interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  id: CreationOptional<number>,
  name: string,
}

const Category = sequelize.define<CategoryModel>(
  "category",
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

export default Category;