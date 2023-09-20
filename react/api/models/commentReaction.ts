import sequelize from "../db";
import { DataTypes } from "sequelize";

const commentReaction = sequelize.define("commentReaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
});

export default commentReaction;