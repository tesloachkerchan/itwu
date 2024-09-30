var express = require('express');
var router = express.Router();
const Post = require('../model/blogModel'); // Assuming 'post.js' is in the models folder

/* GET blog page. */
router.get('/', async function (req, res, next) {
  try {
    const posts = await Post.find();
    res.render('blog', { posts }); // Pass the posts to the blog view
  } catch (error) {
    next(error);
  }
});

/* POST new blog post. */
router.post('/add', async function (req, res, next) {
  try {
    const { img, title, description } = req.body;
    const newPost = new Post({ img, title, description });
    await newPost.save();
    res.status(201).json({ message: 'Blog post added successfully!', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add blog post.', error: error.message });
  }
});

module.exports = router;
