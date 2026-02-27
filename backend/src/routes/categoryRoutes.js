const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/', categoryController.getCategories);
router.post('/', authenticate, authorize('admin', 'manager'), categoryController.createCategory);
router.put('/:id', authenticate, authorize('admin', 'manager'), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
