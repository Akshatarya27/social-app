const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, postController.createPost);
router.get('/feed', authenticate, postController.getFeed);
router.post('/:id/like', authenticate, postController.likePost);
router.post('/:id/comment', authenticate, postController.commentOnPost);

module.exports = router;
