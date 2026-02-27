const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeRole,
} = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);
router.patch('/:id/role', authorize('admin'), changeRole);

module.exports = router;
