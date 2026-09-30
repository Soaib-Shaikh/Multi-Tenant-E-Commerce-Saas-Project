import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required."
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1."
      });
    }

    // Check product
    const product = await Product.findOne({
      _id: productId,
      tenantId: req.tenantId,
      isActive: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock."
      });
    }

    let cart = await Cart.findOne({
      tenantId: req.tenantId,
      customerId: req.user.userId
    });

    if (!cart) {
      cart = await Cart.create({
        tenantId: req.tenantId,
        customerId: req.user.userId,
        items: [
          {
            productId,
            quantity
          }
        ]
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: "Requested quantity exceeds available stock."
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          productId,
          quantity
        });
      }

      await cart.save();
    }

    await calculateCartTotal(cart);

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      cart
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      tenantId: req.tenantId,
      customerId: req.user.userId
    }).populate("items.productId", "name price stock images");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalAmount: 0
        }
      });
    }

    return res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1."
      });
    }

    const product = await Product.findOne({
      _id: productId,
      tenantId: req.tenantId,
      isActive: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock."
      });
    }

    const cart = await Cart.findOne({
      tenantId: req.tenantId,
      customerId: req.user.userId
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product is not in cart."
      });
    }

    item.quantity = quantity;

    await cart.save();
    await calculateCartTotal(cart);

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cart
    });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      tenantId: req.tenantId,
      customerId: req.user.userId
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }

    const oldLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.items.length === oldLength) {
      return res.status(404).json({
        success: false,
        message: "Product is not in cart."
      });
    }

    await cart.save();
    await calculateCartTotal(cart);

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully.",
      cart
    });
  } catch (error) {
    console.error("REMOVE FROM CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      tenantId: req.tenantId,
      customerId: req.user.userId
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
      cart
    });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Calculate cart total
const calculateCartTotal = async (cart) => {
  let total = 0;

  for (const item of cart.items) {
    const product = await Product.findOne({
      _id: item.productId,
      tenantId: cart.tenantId,
      isActive: true
    });

    if (product) {
      total += product.price * item.quantity;
    }
  }

  cart.totalAmount = total;

  await cart.save();

  return cart;
};