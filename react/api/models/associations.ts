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

User.hasMany(Comment, {foreignKey: "userId"});
Comment.belongsTo(User, {foreignKey: "userId"});

User.hasMany(ReactionPost, {foreignKey: "userId"});
ReactionPost.belongsTo(User, {foreignKey: "userId"});

User.hasMany(ReactionComment, {foreignKey: "userId"});
ReactionComment.belongsTo(User, {foreignKey: "userId"});

Post.hasMany(ReactionPost, {foreignKey: "postId"});
ReactionPost.belongsTo(Post, {foreignKey: "postId"});

Post.hasMany(Comment, {foreignKey: "postId"});
Comment.belongsTo(Post, {foreignKey: "postId"});

Comment.hasMany(ReactionComment, {foreignKey: "commentId"});
ReactionComment.belongsTo(Comment, {foreignKey: "commentId"});

Post.belongsToMany(Category, {through: PostCategories});
Category.belongsToMany(Post, {through: PostCategories});

Reaction.hasMany(ReactionComment, {foreignKey: "reactionId"});
ReactionComment.belongsTo(Reaction, {foreignKey: "reactionId"});

Reaction.hasMany(ReactionPost, {foreignKey: "reactionId"});
ReactionPost.belongsTo(Reaction, {foreignKey: "reactionId"});

export default sequelize;

export {Post}