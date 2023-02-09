const router = require("express").router;
const { Post, User, Comment } = require("../../.models");
const isAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'content', 'title', 'created_at'],
    include: [{
      model: "user",
      attributes: ['username']
    },{
      model: 'comment',
      attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
      include: {
        model: "user",
        attributes: ['username']
      }
    }]
  }).then((dbPostData)=>{
    if (!dbPostData){
      res.status(404).json({message:"No post with that ID!"});
      return;
    }
    res.json(dbPostData)
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.post
