const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')

//One to many relationship between user and post
User.hasMany(Post,{
    foreignKey: 'user_id',
})

Post.belongsTo(User,{
    foreignKey: 'user_id'
})

//One to many relationship between user and comment
User.hasMany(Comment,{
    foreignKey: 'user_id',
})

Comment.belongsTo(User,{
    foreignKey: 'user_id',
})

//One to many relationship between post and comment
Post.hasMany(Comment,{
    foreignKey: 'post_id',
})

Comment.belongsTo(Post,{
    foreignKey: 'post_id',
})

module.exports = {User,Post,Comment}