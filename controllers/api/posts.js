const router = require('express').Router()
const {User, Post, Comment} = require('../../models')

//Create a post
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
        res.status(200).json(createPost)
    }
    catch{
        res.status(500).json('failed to create post')
    }
})

//Edit post
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

//Change commenting status
router.post('/commenting', async (req,res) => {
    try{
      req.session.commenting = true
      res.status(200).json('status changed')
    }
    catch{
        res.status(500).json('failed to change status')
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
        req.session.commenting = false
        res.status(200).json(createComment)
    }
    catch{
        res.status(500).json('failed to create comment')
    }
})

//delete post
router.delete('/:id',async (req,res) => {
    try{
        const deletePost = await Post.destroy(
            {
                where:{
                    id: req.params.id
                }
            } 
        )
        res.status(200).json(deletePost)
    }
    catch{
        res.status(500).json('failed to delete post')
    }
    
})

module.exports = router