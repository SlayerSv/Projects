import sequelize from "../db";

const PostCategories = sequelize.define("postCategories", {}, {timestamps: false});

export default PostCategories;