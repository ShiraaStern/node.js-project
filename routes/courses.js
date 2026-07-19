const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/', coursesController.handleGetAll);
router.get('/:id', coursesController.handleGetById);
router.post('/', coursesController.handleCreate);
router.put('/:id', coursesController.handleUpdate);
router.delete('/:id', coursesController.handleDelete);

module.exports = router;