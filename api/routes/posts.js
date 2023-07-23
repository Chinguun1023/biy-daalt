const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//uptade
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("Та зөвхөн өөрийн нитлэлийг засах боломжтой!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Replace this with proper authentication and authorization logic
    const authorized = post.username === req.body.username;
    if (!authorized) {
      return res.status(401).json({ error: "You can delete only your post" });
    }

    try {
      await post.deleteOne(); // Change `delete()` to `deleteOne()`
      res.status(200).json({ message: "Post has been deleted" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "An error occurred while deleting the post" });
    }
  } catch (error) {
    console.error("Find post error:", error);
    res.status(500).json({ error: "An error occurred while finding the post" });
  }
});


//get
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//all get
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
