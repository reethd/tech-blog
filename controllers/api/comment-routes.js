const router = require("express").router;
const { Comment } = require("../../.models");
const isAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Comment.findAll({})
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Comment.findAll({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", isAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put("/:id", isAuth, (req, res) => {
  Comment.update(
    {
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No comment with that ID!" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", isAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No comment with that ID!" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
