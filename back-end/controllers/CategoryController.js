import Category from "../models/CategoryModel.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Please provide category name and slug."
      });
    }

    if (!req.tenantId) {
      return res.status(403).json({
        message: "Tenant not assigned."
      });
    }

    const existingCategory = await Category.findOne({
      tenantId: req.tenantId,
      slug
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this slug already exists."
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file,
        `multi-tenant-ecommerce/categories/${req.tenantId}`
      );

      imageUrl = result.secure_url;
    }

    const category = await Category.create({
      tenantId: req.tenantId,
      name,
      slug,
      description,
      image: imageUrl
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category
    });
  }  catch (error) {
  console.error("CREATE CATEGORY ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message
  });
}
};


// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      tenantId: req.tenantId,
      isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      _id: id,
      tenantId: req.tenantId
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found."
      });
    }

    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    const category = await Category.findOne({
      _id: id,
      tenantId: req.tenantId
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found."
      });
    }

    if (slug && slug !== category.slug) {
      const existingCategory = await Category.findOne({
        tenantId: req.tenantId,
        slug,
        _id: { $ne: id }
      });

      if (existingCategory) {
        return res.status(400).json({
          message: "Category with this slug already exists."
        });
      }
    }

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file,
        `multi-tenant-ecommerce/categories/${req.tenantId}`
      );

      category.image = result.secure_url;
    }

    if (name !== undefined) category.name = name;
    if (slug !== undefined) category.slug = slug;
    if (description !== undefined) category.description = description;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete / Deactivate Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      _id: id,
      tenantId: req.tenantId
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found."
      });
    }

    category.isActive = false;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};