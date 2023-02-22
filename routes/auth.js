const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', authController.register);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', authController.login);

router.get('/', (req, res) => {
  res.send('hello');
});

module.exports = router;
