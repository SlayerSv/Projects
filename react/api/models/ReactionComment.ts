import sequelize from "../db";
import { DataTypes } from "sequelize";

const ReactionComment = sequelize.define(
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