import crypto from "crypto";
import razorpay from "../configs/razorpay.js";
import Payment from "../models/PaymentModel.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";

// Create Payment
export const createPayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required."
            });
        }

        // Find customer order
        const order = await Order.findOne({
            _id: orderId,
            tenantId: req.tenantId,
            customerId: req.user.userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        if (order.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Payment cannot be created for this order."
            });
        }

        // Check existing payment
        const existingPayment = await Payment.findOne({
            orderId: order._id,
            tenantId: req.tenantId,
            status: "success"
        });

        if (existingPayment) {
            return res.status(400).json({
                success: false,
                message: "Payment already completed."
            });
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(order.totalAmount * 100),
            currency: "INR",
            receipt: `order_${order._id}`,
            notes: {
                orderId: order._id.toString(),
                tenantId: req.tenantId.toString(),
                customerId: req.user.userId.toString()
            }
        });

        // Create payment record
        const payment = await Payment.create({
            tenantId: req.tenantId,
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: order.totalAmount,
            status: "pending",
            paymentMethod: "razorpay"
        });

        return res.status(201).json({
            success: true,
            message: "Payment order created successfully.",
            payment: {
                _id: payment._id,
                orderId: payment.orderId,
                razorpayOrderId: payment.razorpayOrderId,
                amount: payment.amount,
                status: payment.status,
                paymentMethod: payment.paymentMethod
            },
            razorpayOrder: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency
            },
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("CREATE PAYMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !orderId
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification details are required."
            });
        }

        // Find customer order
        const order = await Order.findOne({
            _id: orderId,
            tenantId: req.tenantId,
            customerId: req.user.userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        // Find payment record
        const payment = await Payment.findOne({
            orderId: order._id,
            tenantId: req.tenantId,
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment record not found."
            });
        }

        // Check duplicate payment
        if (payment.status === "success") {
            return res.status(200).json({
                success: true,
                message: "Payment already verified.",
                payment,
                order
            });
        }

        // Verify Razorpay signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            payment.status = "failed";
            await payment.save();

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature."
            });
        }

        // Check stock
        for (const item of order.items) {
            const product = await Product.findOne({
                _id: item.productId,
                tenantId: req.tenantId,
                isActive: true
            });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.name}`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.name}.`
                });
            }
        }

        // Update stock
        for (const item of order.items) {
            const product = await Product.findOne({
                _id: item.productId,
                tenantId: req.tenantId,
                isActive: true
            });

            product.stock -= item.quantity;

            await product.save();
        }

        // Update payment
        payment.transactionId = razorpay_payment_id;
        payment.status = "success";
        payment.paymentMethod = "razorpay";

        await payment.save();

        // Update order
        order.status = "confirmed";
        await order.save();

        // Remove ordered products from cart
        const cart = await Cart.findOne({
            tenantId: req.tenantId,
            customerId: req.user.userId
        });

        if (cart) {
            const orderedProductIds = order.items.map(
                (item) => item.productId.toString()
            );

            cart.items = cart.items.filter(
                (item) =>
                    !orderedProductIds.includes(
                        item.productId.toString()
                    )
            );

            // Recalculate cart total
            let cartTotal = 0;

            for (const item of cart.items) {
                const product = await Product.findOne({
                    _id: item.productId,
                    tenantId: req.tenantId,
                    isActive: true
                });

                if (product) {
                    cartTotal += product.price * item.quantity;
                }
            }

            cart.totalAmount = cartTotal;

            await cart.save();
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully. Order confirmed.",
            payment,
            order
        });

    } catch (error) {
        console.error("VERIFY PAYMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};