import Category from "../models/CategoryModel.js";
import { uploadToCloudinary } from "../services/CloudinaryService.js";

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
      return res.status(400).json({
        message: "Tenant is required."
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
      message: "Category created successfully.",
      category
    });
  } catch (error) {
    res.status(500).json({
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
    });

    res.status(200).json({
      message: "Categories fetched successfully.",
      categories
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};