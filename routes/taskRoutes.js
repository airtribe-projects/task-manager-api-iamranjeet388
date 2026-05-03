const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskController');
const validateTask = require('../middleware/validateTask');

// CRUD
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.post('/', validateTask, controller.createTask);
router.put('/:id', validateTask, controller.updateTask);
router.delete('/:id', controller.deleteTask);

// Priority route
router.get('/priority/:level', controller.getByPriority);

module.exports = router;