const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task');

router.get('/tasks', TaskController.getAll);

module.exports = router;