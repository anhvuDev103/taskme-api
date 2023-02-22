const express = require('express');
const TaskController = require('../controllers/PostController');

const router = express.Router();

// @route POST api/task/add
// @desc Add task
// @access Public
router.post('/add', TaskController.add);

module.exports = router;
