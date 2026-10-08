import Product from "../models/ProductModel.js";
import Tenant from "../models/TenantModel.js";

export const getPublicProducts = async (req, res) => {
  try {
    const activeTenants = await Tenant.find({ isActive: true }).select("_id name slug");
    const tenantIds = activeTenants.map((tenant) => tenant._id);
    const storeNames = new Map(activeTenants.map((tenant) => [tenant._id.toString(), tenant.name]));
    const products = await Product.find({ tenantId: { $in: tenantIds }, isActive: true })
      .select("name description price stock images categoryId tenantId createdAt")
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, products: products.map((product) => ({
      ...product.toObject(),
      storeName: storeNames.get(product.tenantId.toString()) || "Store"
    })) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublicProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    })
      .select("name description price stock images categoryId tenantId createdAt")
      .populate("categoryId", "name slug");

    if (!product || !await Tenant.exists({ _id: product.tenantId, isActive: true })) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    const tenant = await Tenant.findById(product.tenantId).select("name slug");
    return res.status(200).json({ success: true, product: { ...product.toObject(), storeName: tenant?.name || "Store" } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
