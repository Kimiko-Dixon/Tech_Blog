const router = require("express").Router();
const ifLoggedIn = require("../utils/middleware");
const { User, Post, Comment } = require("../models");
const { userInfo } = require("os");

router.get("/", async (req, res) => {
  try {
    const posted = await Post.findAll({
      order: ["date"],
      include: [{ model: User }],
    });
    const posts = posted.map((post) => post.get({ plain: true }));

    // res.status(200).json(posts)
    res.render("home", { posts:posts,LoggedIn:req.session.LoggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json("error retrieving posts");
  }
});

router.get("/dashboard", ifLoggedIn, async (req, res) => {
    try {
        console.log(req.session.LoggedIn)
      const userPosted = await Post.findAll({
        where: {
          user_id: req.session.userInfo.id,
        },
        order: ["date"],
        include: [{ model: User }],
      });

      req.session.dashboard = true
      const posts = userPosted.map((post) => post.get({ plain: true }));
      console.log(posts)
      res.render("dashboard", {posts:posts,dashboard:req.session.dashboard,LoggedIn:req.session.LoggedIn});
    } catch(err) {
        console.log(err)
      res.status(500).json("error retrieving posts");
    }
  }
);

router.get("/newPost",ifLoggedIn,async (req, res) => {
    res.render("newPost");
});

router.get("/editPost/:id",ifLoggedIn,async (req, res) => {
    // req.session.post_id = req.params.id
    const editPost = await Post.findByPk(req.params.id)
    
    const post = editPost.get({plain:true})
    console.log(post)
    res.render("editPost",{post:post,LoggedIn:req.session.LoggedIn});
});

router.get('/comment/:id',ifLoggedIn,async (req,res) => {
  const commentOn = await Post.findByPk(req.params.id,{
    include: [{ model: User }]
  })

  const post = commentOn.get({plain:true})
    
    res.render("comment",{post:post,LoggedIn:req.session.LoggedIn});
})

router.get('/commented/:id',ifLoggedIn,async (req,res) => {
  const commentedOn = await Post.findByPk(req.params.id,{
    include:[{model:Comment,include:[User]},{ model: User }]
  })

  const post = commentedOn.get({plain:true})

  /* const postComments = await Comment.findAll({
    include:[{ model: User }],
    where:{
      post_id:req.params.id
    }
  }) */

 /*  const comments = postComments.map(c => c.get({plain:true})) */
  
  console.log(post)  
  console.log(post.comments[0].user)
  res.render("comment-done",{post:post,LoggedIn:req.session.LoggedIn});
})

router.get("/login", async (req, res) => {
  if (req.session.LoggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login",{LoggedIn:req.session.LoggedIn});
});

router.get("/signup", async (req, res) => {
    if (req.session.LoggedIn) {
      res.redirect("/");
      return;
    }
    res.render("signup",{LoggedIn:req.session.LoggedIn});
});



module.exports = router;
