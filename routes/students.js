const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/', studentsController.handleGetAll);
router.get('/:id', studentsController.handleGetById);
router.post('/', studentsController.handleCreate);
router.put('/:id', studentsController.handleUpdate);
router.delete('/:id', studentsController.handleDelete);

module.exports = router;