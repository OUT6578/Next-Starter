const Video = require('../models/Video');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getVideos = asyncHandler(async (req, res) => {
  const { category, tag, search, page = 1, limit = 10, sort = '-createdAt' } = req.query;

  const query = { isActive: true };
  if (category) query.category = category;
  if (tag) query.tags = tag;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const videos = await Video.find(query)
    .populate('category', 'name slug')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Video.countDocuments(query);

  res.json({
    success: true,
    data: videos,
    pagination: {
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    },
  });
});

const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id).populate('category', 'name slug');

  if (!video) {
    throw new ApiError(404, 'Video not found');
  }

  res.json({
    success: true,
    data: video,
  });
});

const createVideo = asyncHandler(async (req, res) => {
  const { title, description, url, thumbnail, duration, category, tags, order } = req.body;

  const video = await Video.create({
    title,
    description,
    url,
    thumbnail,
    duration,
    category,
    tags,
    order,
    uploadedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: video,
  });
});

const updateVideo = asyncHandler(async (req, res) => {
  let video = await Video.findById(req.params.id);

  if (!video) {
    throw new ApiError(404, 'Video not found');
  }

  video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    data: video,
  });
});

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new ApiError(404, 'Video not found');
  }

  video.isActive = false;
  await video.save();

  res.json({
    success: true,
    message: 'Video soft deleted successfully',
  });
});

const getVideosByCategory = asyncHandler(async (req, res) => {
  const videos = await Video.find({ category: req.params.categoryId, isActive: true })
    .populate('category', 'name slug');

  res.json({
    success: true,
    data: videos,
  });
});

module.exports = {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
};
