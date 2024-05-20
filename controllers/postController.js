const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ content, author: req.user.userId });
    await post.save();
    const user = await User.findById(req.user.userId);
    user.posts.push(post._id);
    await user.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('following');
    const posts = await Post.find({ author: { $in: user.following } }).populate('author').sort('-createdAt');
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes.push(req.user.userId);
    await post.save();
    res.status(200).json({ message: 'Post liked' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const comment = new Comment({ content, author: req.user.userId, post: post._id });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
