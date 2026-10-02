import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import Tenant from "../models/TenantModel.js";

const customerIdFor = (req) => req.user.userId;

const calculateCartTotal = async (cart) => {
  const products = await Product.find({
    _id: { $in: cart.items.map((item) => item.productId) },
    tenantId: cart.tenantId,
    isActive: true,
  }).select("_id price");
  const prices = new Map(products.map((product) => [product._id.toString(), product.price]));
  cart.totalAmount = cart.items.reduce((sum, item) => sum + (prices.get(item.productId.toString()) || 0) * item.quantity, 0);
  await cart.save();
  return cart;
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required." });
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) return res.status(400).json({ success: false, message: "Quantity must be at least 1." });

    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product || !await Tenant.exists({ _id: product.tenantId, isActive: true })) {
      return res.status(404).json({ success: false, message: "Product is not available from an active store." });
    }
    if (product.stock < quantity) return res.status(400).json({ success: false, message: "Insufficient stock." });

    let cart = await Cart.findOne({ tenantId: product.tenantId, customerId: customerIdFor(req) });
    if (!cart) {
      cart = await Cart.create({ tenantId: product.tenantId, customerId: customerIdFor(req), items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find((item) => item.productId.toString() === productId);
      if (existingItem) {
        if (existingItem.quantity + Number(quantity) > product.stock) return res.status(400).json({ success: false, message: "Requested quantity exceeds available stock." });
        existingItem.quantity += Number(quantity);
      } else cart.items.push({ productId, quantity });
    }
    await calculateCartTotal(cart);
    return res.status(200).json({ success: true, message: "Product added to cart successfully.", cart });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const carts = await Cart.find({ customerId: customerIdFor(req) }).populate("items.productId", "name price stock images categoryId tenantId").populate("tenantId", "name isActive");
    const activeCarts = carts.filter((cart) => cart.tenantId?.isActive);
    const items = activeCarts.flatMap((cart) => cart.items.map((item) => ({
      ...item.toObject(),
      tenantId: cart.tenantId?._id || cart.tenantId,
      storeName: cart.tenantId?.name || "Store",
    })));
    const totalAmount = activeCarts.reduce((sum, cart) => sum + Number(cart.totalAmount || 0), 0);
    return res.status(200).json({ success: true, cart: { items, totalAmount } });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ success: false, message: "Quantity must be at least 1." });
    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    if (quantity > product.stock) return res.status(400).json({ success: false, message: "Requested quantity exceeds available stock." });
    const cart = await Cart.findOne({ tenantId: product.tenantId, customerId: customerIdFor(req) });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });
    const item = cart.items.find((entry) => entry.productId.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: "Product is not in cart." });
    item.quantity = quantity;
    await calculateCartTotal(cart);
    return res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ customerId: customerIdFor(req), "items.productId": productId });
    if (!cart) return res.status(404).json({ success: false, message: "Product is not in cart." });
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await calculateCartTotal(cart);
    return res.status(200).json({ success: true, message: "Product removed from cart successfully.", cart });
  } catch (error) {
    console.error("REMOVE FROM CART ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const filter = { customerId: customerIdFor(req) };
    if (req.body?.tenantId) filter.tenantId = req.body.tenantId;
    await Cart.deleteMany(filter);
    return res.status(200).json({ success: true, message: "Cart cleared successfully.", cart: { items: [], totalAmount: 0 } });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
