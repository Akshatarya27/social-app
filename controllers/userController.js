const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findPeople = async (req, res) => {
  try {
    const users = await User.find().select('username');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const userToFollow = await User.findById(req.params.id);
    if (!user || !userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.following.push(userToFollow._id);
    userToFollow.followers.push(user._id);
    await user.save();
    await userToFollow.save();
    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
