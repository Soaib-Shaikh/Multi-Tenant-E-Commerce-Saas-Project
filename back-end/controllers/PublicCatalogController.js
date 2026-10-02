import mongoose from "mongoose";
import Product from "../models/ProductModel.js";
import Tenant from "../models/TenantModel.js";

const findActiveTenant = async (tenantId) => {
  if (!mongoose.isValidObjectId(tenantId)) return null;
  return Tenant.findOne({ _id: tenantId, isActive: true }).select("_id");
};

export const getPublicProducts = async (req, res) => {
  try {
    const tenant = await findActiveTenant(req.query.tenantId);
    if (!tenant) {
      return res.status(404).json({ success: false, message: "Active store not found." });
    }

    const products = await Product.find({ tenantId: tenant._id, isActive: true })
      .select("name description price stock images categoryId createdAt")
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicProductById = async (req, res) => {
  try {
    const tenant = await findActiveTenant(req.query.tenantId);
    if (!tenant) {
      return res.status(404).json({ success: false, message: "Active store not found." });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      tenantId: tenant._id,
      isActive: true,
    })
      .select("name description price stock images categoryId createdAt")
      .populate("categoryId", "name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
