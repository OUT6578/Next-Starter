const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.post('/update', authenticate, trackingController.updateTracking);
router.get('/video/:videoId', authenticate, authorize('admin', 'manager'), trackingController.getVideoTracking);
router.get('/user/:userId', authenticate, trackingController.getUserTracking);
router.get('/user/:userId/video/:videoId', authenticate, trackingController.getUserVideoTracking);
router.get('/stats/overview', authenticate, authorize('admin', 'manager'), trackingController.getOverviewStats);
router.get('/stats/video/:videoId', authenticate, authorize('admin', 'manager'), trackingController.getVideoStats);
router.get('/stats/leaderboard', authenticate, trackingController.getLeaderboard);

module.exports = router;
