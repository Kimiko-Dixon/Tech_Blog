const router = require("express").Router();
const ifLoggedIn = require("../utils/middleware");
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    console.log(req.session.LoggedIn)
    req.session.commenting = false
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
      req.session.commenting = false
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
  req.session.commenting = false
    res.render("newPost");
});

router.get("/editPost/:id",ifLoggedIn,async (req, res) => {
    req.session.commenting = false
    const editPost = await Post.findByPk(req.params.id)
    
    const post = editPost.get({plain:true})
    console.log(post)
    res.render("editPost",{post:post,LoggedIn:req.session.LoggedIn});
});

router.get('/comment/:id',async (req,res) => {
  console.log(req.session.LoggedIn)
  const commentOn = await Post.findByPk(req.params.id,{
    //Help from TA
    include:[{model:Comment,include:[User]},{ model: User }]
  })
  
  const post = commentOn.get({plain:true})
    
    res.render("comment",{post:post,LoggedIn:req.session.LoggedIn,commenting:req.session.commenting});
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
