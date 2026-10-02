import crypto from "crypto";

import razorpay from "../configs/razorpay.js";

import Payment from "../models/PaymentModel.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";

import { sendEmail } from "../services/EmailService.js";


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
            tenantId: order.tenantId,
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
                tenantId: order.tenantId.toString(),
                customerId: req.user.userId.toString()
            }
        });

        // Create payment record
        const payment = await Payment.create({
            tenantId: order.tenantId,
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
            tenantId: order.tenantId,
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
                tenantId: order.tenantId,
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
                tenantId: order.tenantId,
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


        // =====================================================
        // SEND ORDER CONFIRMATION EMAIL
        // =====================================================

        try {
            const user = await User.findById(req.user.userId);

            if (user) {
                await sendEmail({
                    to: user.email,

                    subject:
                        "Order Confirmed - E-Commerce SaaS",

                    html: `
                        <div
                            style="
                                font-family: Arial, sans-serif;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                color: #333;
                            "
                        >

                            <h2 style="color: #16a34a;">
                                Order Confirmed 🎉
                            </h2>

                            <p>
                                Hello <strong>${user.name}</strong>,
                            </p>

                            <p>
                                Your payment was successful and your
                                order has been confirmed.
                            </p>

                            <hr />

                            <h3>Order Details</h3>

                            <p>
                                <strong>Order ID:</strong>
                                ${order._id}
                            </p>

                            <p>
                                <strong>Payment ID:</strong>
                                ${razorpay_payment_id}
                            </p>

                            <p>
                                <strong>Total Amount:</strong>
                                ₹${order.totalAmount}
                            </p>

                            <hr />

                            <h3>Ordered Items</h3>

                            <ul>
                                ${order.items
                                    .map(
                                        (item) => `
                                            <li style="margin-bottom: 8px;">
                                                <strong>
                                                    ${item.name}
                                                </strong>
                                                × ${item.quantity}
                                                — ₹${item.price * item.quantity}
                                            </li>
                                        `
                                    )
                                    .join("")}
                            </ul>

                            <hr />

                            <h3>Shipping Address</h3>

                            <p>
                                <strong>
                                    ${order.shippingAddress.name}
                                </strong>
                                <br />

                                ${order.shippingAddress.address}
                                <br />

                                ${order.shippingAddress.city},
                                ${order.shippingAddress.state}
                                -
                                ${order.shippingAddress.pincode}
                                <br />

                                Phone:
                                ${order.shippingAddress.phone}
                            </p>

                            <hr />

                            <p>
                                Thank you for shopping with us! ❤️
                            </p>

                            <p>
                                <strong>
                                    E-Commerce SaaS Team
                                </strong>
                            </p>

                        </div>
                    `
                });

                console.log(
                    "ORDER CONFIRMATION EMAIL SENT:",
                    user.email
                );
            }

        } catch (emailError) {
            // Email failure should NOT affect successful payment
            console.error(
                "ORDER CONFIRMATION EMAIL ERROR:",
                emailError.message
            );
        }


        // =====================================================
        // REMOVE ORDERED PRODUCTS FROM CART
        // =====================================================

        const cart = await Cart.findOne({
            tenantId: order.tenantId,
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
                    tenantId: order.tenantId,
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
            message:
                "Payment verified successfully. Order confirmed.",
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

// REFUND PAYMENT - SELLER

export const refundPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find order inside current tenant
        const order = await Order.findOne({
            _id: orderId,
            tenantId: req.tenantId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        // Refund request must exist
        if (
            !order.cancelRequested &&
            !order.returnRequested
        ) {
            return res.status(400).json({
                success: false,
                message: "No cancellation or return request found."
            });
        }

        // Refund already completed
        if (order.refundStatus === "refunded") {
            return res.status(400).json({
                success: false,
                message: "Payment is already refunded."
            });
        }

        // Find successful payment
        const payment = await Payment.findOne({
            orderId: order._id,
            tenantId: req.tenantId,
            status: "success"
        });

        if (!payment) {
            return res.status(400).json({
                success: false,
                message: "Successful payment not found for this order."
            });
        }

        // Mark refund as approved
        order.refundStatus = "approved";
        await order.save();

        // Razorpay refund
        const refund = await razorpay.payments.refund(
            payment.transactionId
        );

        // Update payment
        payment.status = "refunded";

        await payment.save();

        // Update order status
        if (order.returnRequested) {
            order.status = "returned";
        } else {
            order.status = "cancelled";
        }

        order.refundStatus = "refunded";

        await order.save();

        // Find customer
        const user = await User.findById(order.customerId);

        // Send refund email
        if (user) {
            try {
                const requestType = order.returnRequested
                    ? "return"
                    : "cancellation";

                await sendEmail({
                    to: user.email,

                    subject:
                        "Order Refund Successful - E-Commerce SaaS",

                    html: `
                        <div
                            style="
                                font-family: Arial, sans-serif;
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                color: #333;
                            "
                        >

                            <h2>
                                Refund Successful
                            </h2>

                            <p>
                                Hello <strong>${user.name}</strong>,
                            </p>

                            <p>
                                Your ${requestType} request for order
                                <strong>${order._id}</strong>
                                has been approved.
                            </p>

                            <hr />

                            <p>
                                <strong>Order ID:</strong>
                                ${order._id}
                            </p>

                            <p>
                                <strong>Refund Amount:</strong>
                                ₹${payment.amount}
                            </p>

                            <p>
                                <strong>Refund ID:</strong>
                                ${refund.id}
                            </p>

                            <p>
                                The refunded amount will be credited
                                according to the payment provider/bank
                                processing time.
                            </p>

                            <hr />

                            <p>
                                Thank you for shopping with us.
                            </p>

                            <p>
                                <strong>
                                    E-Commerce SaaS Team
                                </strong>
                            </p>

                        </div>
                    `
                });

                console.log(
                    "REFUND EMAIL SENT:",
                    user.email
                );

            } catch (emailError) {
                console.error(
                    "REFUND EMAIL ERROR:",
                    emailError.message
                );
            }
        }

        return res.status(200).json({
            success: true,
            message: "Refund processed successfully.",
            refundId: refund.id,
            refundAmount: payment.amount,
            order
        });

    } catch (error) {
        console.error(
            "REFUND PAYMENT ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
