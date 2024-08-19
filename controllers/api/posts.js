const router = require('express').Router()
const {User, Post, Comment} = require('../../models')

//create a post
router.post('/', async (req,res) => {
    try{
        const createPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: userInfo.id
        })
        res.status(200).json(createPost)
    }
    catch{
        res.status(500).json('failed to create post')
    }
})

//edit post

//Create comment
router.post('/comment', async (req,res) => {
    try{
        const postId = await Post.getOne({
            where:{
                [Op.and]:{
                    title: req.body.title,
                    text: req.body.content
                    
                }
            }
        })
        const createComment = await Comment.create({
            text: req.body.text,
            user_id: userInfo.id,
            post_id:'?'
        })
        res.status(200).json(createPost)
    }
    catch{
        res.status(500).json('failed to create post')
    }
})

module.exports = router