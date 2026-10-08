import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import Tenant from "../models/TenantModel.js";
import Coupon from "../models/Couponmodel.js";
import Notification from "../models/NotificationModel.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, tenantId: requestedTenantId, couponCode } =
      req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required.",
      });
    }

    const customerCarts = await Cart.find({
      customerId: req.user.userId,
    });

    const selectedTenantId =
      requestedTenantId ||
      req.user.tenantId ||
      customerCarts[0]?.tenantId;

    if (!selectedTenantId) {
      return res.status(400).json({
        success: false,
        message: "Choose a store cart to check out.",
      });
    }

    if (!(await Tenant.exists({ _id: selectedTenantId, isActive: true }))) {
      return res.status(400).json({
        success: false,
        message: "This store is not currently available for checkout.",
      });
    }

    const cart = await Cart.findOne({
      tenantId: selectedTenantId,
      customerId: req.user.userId,
    }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    const orderItems = [];
    let subtotal = 0;

    // Validate products and stock
    for (const item of cart.items) {
      const product = await Product.findOne({
        _id: item.productId._id,
        tenantId: selectedTenantId,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.productId.name}" is no longer available.`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}".`,
        });
      }

      const itemTotal = product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images?.[0] || "",
      });

      subtotal += itemTotal;
    }

    // Validate and calculate coupon against selected store's cart
    let discountAmount = 0;
    let appliedCoupon = null;

    if (couponCode && couponCode.trim()) {
      const normalizedCode = couponCode.trim().toUpperCase();

      appliedCoupon = await Coupon.findOne({
        tenantId: selectedTenantId,
        code: normalizedCode,
      });

      if (!appliedCoupon) {
        return res.status(400).json({
          success: false,
          message: "Invalid coupon code.",
        });
      }

      if (!appliedCoupon.isActive) {
        return res.status(400).json({
          success: false,
          message: "This coupon is inactive.",
        });
      }

      if (new Date(appliedCoupon.expiresAt) < new Date()) {
        return res.status(400).json({
          success: false,
          message: "This coupon has expired.",
        });
      }

      if (
        appliedCoupon.usageLimit !== null &&
        appliedCoupon.usedCount >= appliedCoupon.usageLimit
      ) {
        return res.status(400).json({
          success: false,
          message: "Coupon usage limit reached.",
        });
      }

      if (subtotal < appliedCoupon.minOrderAmount) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount should be ₹${appliedCoupon.minOrderAmount}.`,
        });
      }

      discountAmount =
        appliedCoupon.discountType === "percentage"
          ? (subtotal * appliedCoupon.discountValue) / 100
          : appliedCoupon.discountValue;

      if (
        appliedCoupon.maxDiscount !== null &&
        discountAmount > appliedCoupon.maxDiscount
      ) {
        discountAmount = appliedCoupon.maxDiscount;
      }

      discountAmount = Math.min(discountAmount, subtotal);
    }

    const totalAmount = subtotal - discountAmount;

    const order = await Order.create({
      tenantId: selectedTenantId,
      customerId: req.user.userId,
      items: orderItems,
      subtotal,
      discountAmount,
      couponCode: appliedCoupon?.code || null,
      couponId: appliedCoupon?._id || null,
      totalAmount,
      shippingAddress,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customerId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ORDER
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      customerId: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CUSTOMER CANCEL ORDER REQUEST
export const requestCancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findOne({
      _id: id,
      customerId: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Payment must be completed
    if (order.status === "pending") {
      return res.status(400).json({
        success: false,
        message: "You can cancel the order only after payment is completed.",
      });
    }

    // Already cancelled
    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled.",
      });
    }

    // Delivered orders should use return
    if (order.status === "delivered") {
      return res.status(400).json({
        success: false,
        message:
          "Delivered order cannot be cancelled. Please request a return.",
      });
    }

    // Shipped orders
    if (order.status === "shipped") {
      return res.status(400).json({
        success: false,
        message:
          "Shipped order cannot be cancelled. Please contact the seller.",
      });
    }

    if (order.cancelRequested || order.refundStatus === "requested") {
      return res.status(400).json({
        success: false,
        message: "Cancellation request already submitted.",
      });
    }

    order.cancelRequested = true;
    order.refundStatus = "requested";
    order.returnReason =
      reason || "Customer requested order cancellation.";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancellation request submitted successfully.",
      order,
    });
  } catch (error) {
    console.error("CANCEL ORDER REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CUSTOMER RETURN ORDER REQUEST
export const requestReturnOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findOne({
      _id: id,
      customerId: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.status !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "Return can be requested only after the order is delivered.",
      });
    }

    if (order.returnRequested || order.refundStatus === "requested") {
      return res.status(400).json({
        success: false,
        message: "Return request already submitted.",
      });
    }

    if (order.refundStatus === "refunded") {
      return res.status(400).json({
        success: false,
        message: "Order is already refunded.",
      });
    }

    order.returnRequested = true;
    order.refundStatus = "requested";
    order.returnReason = reason || "Customer requested a return.";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Return request submitted successfully.",
      order,
    });
  } catch (error) {
    console.error("RETURN ORDER REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS - SELLER
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "processing",
      "shipped",
      "delivered",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findOne({
      _id: id,
      tenantId: req.tenantId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.status === "pending") {
      return res.status(400).json({
        success: false,
        message: "Order payment is not completed yet.",
      });
    }

    if (order.status === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be updated.",
      });
    }

    if (
      order.status === "cancelled" ||
      order.status === "returned"
    ) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be updated.",
      });
    }

    order.status = status;

    await order.save();

    // Create customer notification
    try {
      const statusMessages = {
        processing: "Your order is now being processed.",
        shipped: "Your order has been shipped.",
        delivered: "Your order has been delivered successfully.",
      };

      await Notification.create({
        userId: order.customerId,
        tenantId: order.tenantId,
        type: "order",
        title: `Order ${
          status.charAt(0).toUpperCase() + status.slice(1)
        }`,
        message:
          statusMessages[status] ||
          `Your order status has been updated to ${status}.`,
        orderId: order._id,
        isRead: false,
      });
    } catch (notificationError) {
      console.error(
        "ORDER NOTIFICATION ERROR:",
        notificationError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};