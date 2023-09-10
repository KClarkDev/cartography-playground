const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // If a user is deleted, delete the associated blog posts
});

User.hasMany(Comment, {
  foreignKey: 'userId',
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blogPostId',
  onDelete: 'CASCADE', // If a blog post is deleted, delete the associated comments
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogPostId',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, BlogPost, Comment };
