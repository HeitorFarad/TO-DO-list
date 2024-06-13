// routes/taskRoutes.js

const router = require('express').Router();
const taskController = require('../controllers/taskController');

// Create - criação de dados
router.post('/', taskController.createTask);

// Read - leitura de dados
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

// Update - atualização de dados (PATCH)
router.patch('/:id', taskController.updateTask);

// Delete - deletar dados
router.delete('/:id', taskController.deleteTask);

module.exports = router;
