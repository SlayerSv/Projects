import User from "./User";
import Post from "./Post";
import Comment from "./Comment";
import Reaction from "./Reaction";
import Category from "./Category";
import ReactionComment from "./ReactionComment";
import ReactionPost from "./ReactionPost";
import PostCategories from "./PostCategories";
import sequelize from "../db";

User.hasMany(Post, {foreignKey: "userId"});
Post.belongsTo(User, {foreignKey: "userId"});

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(ReactionPost);
ReactionPost.belongsTo(User);

User.hasMany(ReactionComment);
ReactionComment.belongsTo(User);

Post.hasMany(ReactionPost);
ReactionPost.belongsTo(Post);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Comment.hasMany(ReactionComment);
ReactionComment.belongsTo(Comment);

Post.belongsToMany(Category, {through: PostCategories});
Category.belongsToMany(Post, {through: PostCategories});

Reaction.hasMany(ReactionComment);
ReactionComment.belongsTo(Reaction);

Reaction.hasMany(ReactionPost);
ReactionPost.belongsTo(Reaction);

export default sequelize;

export {Post}