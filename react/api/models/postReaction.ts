import sequelize from "../db";
import { DataTypes } from "sequelize";

const postReaction = sequelize.define("postReaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
});

export default postReaction;