const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getUsers = asyncHandler(async (req, res) => {
  const { role, search, page = 1, limit = 10 } = req.query;

  const query = {};
  if (role) query.role = role;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const users = await User.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await User.countDocuments(query);

  res.json({
    success: true,
    data: users,
    pagination: {
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    },
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json({
    success: true,
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Not authorized to update this user');
  }

  const { name, profilePic, isActive } = req.body;
  user.name = name || user.name;
  user.profilePic = profilePic || user.profilePic;
  if (req.user.role === 'admin') {
    user.isActive = isActive !== undefined ? isActive : user.isActive;
  }

  await user.save();

  res.json({
    success: true,
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isActive = false;
  await user.save();

  res.json({
    success: true,
    message: 'User deactivated successfully',
  });
});

const changeRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.role = role;
  await user.save();

  res.json({
    success: true,
    data: user,
  });
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeRole,
};
