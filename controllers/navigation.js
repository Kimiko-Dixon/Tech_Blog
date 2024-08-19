const router = require("express").Router();
const ifLoggedIn = require("../utils/middleware");
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const posted = await Post.findAll({
      order: ["date", "DESC"],
      include: [User],
    });
    /*         if(!posted){
            res.render('')
        } */
    const posts = posted.map((post) => post.get({ plain: true }));

    console.log(posts);
    res.render("home", { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json("error retrieving posts");
  }
});

router.get("/dashboard", ifLoggedIn, async (req, res) => {
  try {
    const userPosted = await Post.findAll({
      where: {
        user_id: userInfo.id,
      },
      order: ["date", "DESC"],
      include: [{ model: User }],
    });
    const posts = userPosted.map((post) => post.get({ plain: true }));
    res.render("dashboard", posts);
  } catch {
    res.status(500).json("error retrieving posts");
  }
});

router.get("/login", ifLoggedIn, async (req, res) => {
  res.render("/");
});

module.exports = router;
