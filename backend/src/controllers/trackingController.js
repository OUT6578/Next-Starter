const VideoTracking = require('../models/VideoTracking');
const Video = require('../models/Video');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const updateTracking = asyncHandler(async (req, res) => {
  const { videoId, watchedDuration, lastPosition, skippedSegments } = req.body;
  const userId = req.user._id;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, 'Video not found');
  }

  let tracking = await VideoTracking.findOne({ userId, videoId });

  if (!tracking) {
    tracking = new VideoTracking({
      userId,
      videoId,
      totalDuration: video.duration,
      watchedDuration,
      lastPosition,
      skippedSegments,
    });
  } else {
    if (watchedDuration > tracking.watchedDuration) {
      tracking.watchedDuration = watchedDuration;
    }
    tracking.lastPosition = lastPosition;
    tracking.skippedSegments = skippedSegments;
  }

  tracking.watchSessions.push({
    startedAt: new Date(Date.now() - 5000),
    endedAt: new Date(),
    deviceInfo: req.headers['user-agent'],
  });

  await tracking.save();

  res.json({
    success: true,
    data: tracking,
  });
});

const getVideoTracking = asyncHandler(async (req, res) => {
  const tracking = await VideoTracking.find({ videoId: req.params.videoId })
    .populate('userId', 'name email');

  res.json({
    success: true,
    data: tracking,
  });
});

const getUserTracking = asyncHandler(async (req, res) => {
  const tracking = await VideoTracking.find({ userId: req.params.userId })
    .populate('videoId', 'title duration thumbnail');

  res.json({
    success: true,
    data: tracking,
  });
});

const getUserVideoTracking = asyncHandler(async (req, res) => {
  const tracking = await VideoTracking.findOne({
    userId: req.params.userId,
    videoId: req.params.videoId,
  });

  res.json({
    success: true,
    data: tracking,
  });
});

const getOverviewStats = asyncHandler(async (req, res) => {
  const stats = await VideoTracking.aggregate([
    {
      $group: {
        _id: null,
        totalWatchedSeconds: { $sum: '$watchedDuration' },
        avgWatchedPercent: { $avg: '$watchedPercent' },
        totalCompletions: { $sum: { $cond: ['$isCompleted', 1, 0] } },
      },
    },
  ]);

  res.json({
    success: true,
    data: stats[0] || {
      totalWatchedSeconds: 0,
      avgWatchedPercent: 0,
      totalCompletions: 0,
    },
  });
});

const getVideoStats = asyncHandler(async (req, res) => {
  const stats = await VideoTracking.aggregate([
    { $match: { videoId: req.params.videoId } },
    {
      $group: {
        _id: '$videoId',
        avgWatchedPercent: { $avg: '$watchedPercent' },
        totalViews: { $count: {} },
        completions: { $sum: { $cond: ['$isCompleted', 1, 0] } },
      },
    },
  ]);

  res.json({
    success: true,
    data: stats[0] || {
      avgWatchedPercent: 0,
      totalViews: 0,
      completions: 0,
    },
  });
});

const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await VideoTracking.aggregate([
    {
      $group: {
        _id: '$userId',
        totalWatchTime: { $sum: '$watchedDuration' },
      },
    },
    { $sort: { totalWatchTime: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        name: '$user.name',
        totalWatchTime: 1,
      },
    },
  ]);

  res.json({
    success: true,
    data: leaderboard,
  });
});

module.exports = {
  updateTracking,
  getVideoTracking,
  getUserTracking,
  getUserVideoTracking,
  getOverviewStats,
  getVideoStats,
  getLeaderboard,
};
