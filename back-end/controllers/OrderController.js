import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required."
      });
    }

    const cart = await Cart.findOne({
      tenantId: req.tenantId,
      customerId: req.user.userId
    }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty."
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    // Validate products and stock
    for (const item of cart.items) {
      const product = await Product.findOne({
        _id: item.productId._id,
        tenantId: req.tenantId,
        isActive: true
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.productId.name}" is no longer available.`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}".`
        });
      }

      const itemTotal = product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images?.[0] || ""
      });

      totalAmount += itemTotal;
    }

    // Create order
    const order = await Order.create({
      tenantId: req.tenantId,
      customerId: req.user.userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "pending"
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get My Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      tenantId: req.tenantId,
      customerId: req.user.userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      tenantId: req.tenantId,
      customerId: req.user.userId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};