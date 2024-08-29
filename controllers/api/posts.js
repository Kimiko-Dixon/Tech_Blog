const router = require('express').Router()
const { where } = require('sequelize')
const {User, Post, Comment} = require('../../models')

//create a post
router.post('/', async (req,res) => {
    try{
        const createPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userInfo.id
        },
        {
            include:[{model:User}]
        })

        console.log(createPost)
        // const post = createPost.map(post => post.get({plain:true}))
        // res.render('dashboard',createPost)*
        res.status(200).json(createPost)
    }
    catch{
        res.status(500).json('failed to create post')
    }
})

//edit post
router.put('/:id',async (req,res) => {
    try{
        const editPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where:{
                    id: req.params.id
                }
            } 
        )
        res.status(200).json(editPost)
    }
    catch{
        res.status(500).json('failed to edit post')
    }
    
})
//Create comment
router.post('/comment/:id', async (req,res) => {
    try{
        console.log('here')
        const createComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.userInfo.id,
            post_id:req.params.id
        })

        console.log(createComment)
        // req.session.commentid = createComment.id
        res.status(200).json(createComment)
    }
    catch{
        res.status(500).json('failed to create comment')
    }
})

module.exports = router