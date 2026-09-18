import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import { uploadToCloudinary } from "../services/CloudinaryService.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      description,
      price,
      stock
    } = req.body;

    // Required fields validation
    if (!categoryId || !name || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide category, name, description and price."
      });
    }

    // Tenant check
    if (!req.tenantId) {
      return res.status(403).json({
        success: false,
        message: "Tenant not assigned."
      });
    }

    // Check category belongs to same tenant
    const category = await Category.findOne({
      _id: categoryId,
      tenantId: req.tenantId,
      isActive: true
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found."
      });
    }

    // Upload multiple images
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(
          file,
          `multi-tenant-ecommerce/products/${req.tenantId}`
        )
      );

      const results = await Promise.all(uploadPromises);

      imageUrls = results.map((result) => result.secure_url);
    }

    // Create product
    const product = await Product.create({
      tenantId: req.tenantId,
      categoryId,
      name,
      description,
      price,
      stock: stock || 0,
      images: imageUrls
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      tenantId: req.tenantId,
      isActive: true
    })
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      tenantId: req.tenantId,
      isActive: true
    }).populate("categoryId", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      categoryId,
      name,
      description,
      price,
      stock
    } = req.body;

    // Find product only inside current tenant
    const product = await Product.findOne({
      _id: id,
      tenantId: req.tenantId
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    // If category is being changed, check new category
    if (categoryId && categoryId !== product.categoryId.toString()) {
      const category = await Category.findOne({
        _id: categoryId,
        tenantId: req.tenantId,
        isActive: true
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found."
        });
      }

      product.categoryId = categoryId;
    }

    // Update fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(
          file,
          `multi-tenant-ecommerce/products/${req.tenantId}`
        )
      );

      const results = await Promise.all(uploadPromises);

      product.images = results.map((result) => result.secure_url);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete / Deactivate Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      tenantId: req.tenantId
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    // Soft delete
    product.isActive = false;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully."
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};