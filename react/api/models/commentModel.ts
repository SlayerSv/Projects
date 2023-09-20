import sequelize from "../db";
import { DataTypes } from "sequelize";

const Comment = sequelize.define("comment", {
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
});

export default Comment;