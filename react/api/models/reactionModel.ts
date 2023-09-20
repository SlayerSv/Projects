import sequelize from "../db";
import { DataTypes } from "sequelize";

const Reaction = sequelize.define("reaction", {
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
});

export default Reaction;