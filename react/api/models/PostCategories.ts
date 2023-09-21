import sequelize from "../db";

const PostCategories = sequelize.define("PostCategories", {}, {timestamps: false});

export default PostCategories;