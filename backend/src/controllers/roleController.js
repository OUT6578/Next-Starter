const Role = require('../models/Role');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const createRole = asyncHandler(async (req, res) => {
  const { name, permissions, description } = req.body;
  const role = await Role.create({ name, permissions, description });

  res.status(201).json({
    success: true,
    data: role,
  });
});

const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();
  res.json({
    success: true,
    data: roles,
  });
});

const updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!role) {
    throw new ApiError(404, 'Role not found');
  }

  res.json({
    success: true,
    data: role,
  });
});

module.exports = {
  createRole,
  getRoles,
  updateRole,
};
