const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollmentsController');

// שימי לב לתיקון הכתובות כדי שיתאימו ל-app.js החדש
router.get('/all', enrollmentsController.handleGetAll);
router.get('/:id', enrollmentsController.handleGetById);
router.post('/', enrollmentsController.handleCreate);
router.put('/:id', enrollmentsController.handleUpdate);
router.delete('/:id', enrollmentsController.handleDelete);

module.exports = router;