const User = require('../models/User');
const Video = require('../models/Video');
const VideoTracking = require('../models/VideoTracking');
const asyncHandler = require('../utils/asyncHandler');

const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalVideos = await Video.countDocuments();
  const trackingStats = await VideoTracking.aggregate([
    {
      $group: {
        _id: null,
        totalWatchHours: { $sum: { $divide: ['$watchedDuration', 3600] } },
        avgCompletionRate: { $avg: '$watchedPercent' },
      },
    },
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalVideos,
      totalWatchHours: trackingStats[0]?.totalWatchHours || 0,
      avgCompletionRate: trackingStats[0]?.avgCompletionRate || 0,
    },
  });
});

const getManagerStats = asyncHandler(async (req, res) => {
  const totalVideosManaged = await Video.countDocuments({ uploadedBy: req.user._id });
  const videoStats = await VideoTracking.aggregate([
    {
      $lookup: {
        from: 'videos',
        localField: 'videoId',
        foreignField: '_id',
        as: 'video',
      },
    },
    { $unwind: '$video' },
    { $match: { 'video.uploadedBy': req.user._id } },
    {
      $group: {
        _id: null,
        totalViews: { $count: {} },
        avgWatchPercent: { $avg: '$watchedPercent' },
      },
    },
  ]);

  res.json({
    success: true,
    data: {
      totalVideosManaged,
      totalViews: videoStats[0]?.totalViews || 0,
      avgWatchPercent: videoStats[0]?.avgWatchPercent || 0,
    },
  });
});

const getUserStats = asyncHandler(async (req, res) => {
  const myTracking = await VideoTracking.find({ userId: req.user._id });
  const totalWatchedSeconds = myTracking.reduce((acc, curr) => acc + curr.watchedDuration, 0);
  const completions = myTracking.filter(t => t.isCompleted).length;

  res.json({
    success: true,
    data: {
      totalVideosWatched: myTracking.length,
      totalWatchTimeMinutes: Math.round(totalWatchedSeconds / 60),
      completions,
    },
  });
});

module.exports = {
  getAdminStats,
  getManagerStats,
  getUserStats,
};
