const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, icon } = req.body;
  const category = await Category.create({ name, slug, description, icon });

  res.status(201).json({
    success: true,
    data: category,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true });
  res.json({
    success: true,
    data: categories,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.json({
    success: true,
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.json({
    success: true,
    message: 'Category deleted',
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
