const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');


router.post('/')
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/find', authenticate, userController.findPeople);
router.post('/follow/:id', authenticate, userController.followUser);

module.exports = router;
