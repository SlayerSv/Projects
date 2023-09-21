import sequelize from "../db";
import { DataTypes } from "sequelize";

const ReactionPost = sequelize.define("ReactionPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
});

export default ReactionPost;