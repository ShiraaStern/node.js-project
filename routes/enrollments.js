const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollmentsController');

// מתוקן לנתיב הראשי של הראוטר
router.get('/', enrollmentsController.handleGetAll);
router.get('/:id', enrollmentsController.handleGetById);
router.post('/', enrollmentsController.handleCreate);
router.put('/:id', enrollmentsController.handleUpdate);
router.delete('/:id', enrollmentsController.handleDelete);

module.exports = router;