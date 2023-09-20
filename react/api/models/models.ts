import User from "./userModel";
import Post from "./postModel";
import Comment from "./commentModel";
import Reaction from "./reactionModel";
import Category from "./categoryModel";
import CommentReaction from "./commentReaction";
import PostReaction from "./postReaction";

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(PostReaction);
PostReaction.belongsTo(User);

User.hasMany(CommentReaction);
CommentReaction.belongsTo(User);

Post.hasMany(PostReaction);
PostReaction.belongsTo(Post);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Comment.hasMany(CommentReaction);
CommentReaction.belongsTo(Comment);

Category.hasMany(Post);
Post.belongsTo(Category);

Reaction.hasMany(CommentReaction);
CommentReaction.belongsTo(Reaction);

Reaction.hasMany(PostReaction);
PostReaction.belongsTo(Reaction);



const models = {User, Post, Comment, Reaction, CommentReaction, PostReaction, Category}

export default models;