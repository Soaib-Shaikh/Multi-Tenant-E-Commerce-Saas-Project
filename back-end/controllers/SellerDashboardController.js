import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import Payment from "../models/PaymentModel.js";

// Get Seller Dashboard
export const getSellerDashboard = async (req, res) => {
    try {
        const tenantId = req.tenantId;

        const totalProducts = await Product.countDocuments({
            tenantId
        });

        const activeProducts = await Product.countDocuments({
            tenantId,
            isActive: true
        });

        const outOfStockProducts = await Product.countDocuments({
            tenantId,
            stock: 0,
            isActive: true
        });

        const lowStockProducts = await Product.countDocuments({
            tenantId,
            stock: { $gt: 0, $lte: 5 },
            isActive: true
        });

        const totalOrders = await Order.countDocuments({
            tenantId
        });

        const pendingOrders = await Order.countDocuments({
            tenantId,
            status: "pending"
        });

        const successfulPayments = await Payment.find({
            tenantId,
            status: "success"
        }).select("amount");

        const totalSales = successfulPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        const recentOrders = await Order.find({
            tenantId
        })
            .populate("customerId", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                activeProducts,
                outOfStockProducts,
                lowStockProducts,
                totalOrders,
                pendingOrders,
                totalSales
            },
            recentOrders
        });

    } catch (error) {
        console.error("SELLER DASHBOARD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};