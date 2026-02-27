const express = require('express');
const {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
} = require('../controllers/videoController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.get('/category/:categoryId', getVideosByCategory);

// Protected routes (admin/manager)
router.use(authenticate);
router.post('/', authorize('admin', 'manager'), createVideo);
router.put('/:id', authorize('admin', 'manager'), updateVideo);
router.delete('/:id', authorize('admin'), deleteVideo);

module.exports = router;
