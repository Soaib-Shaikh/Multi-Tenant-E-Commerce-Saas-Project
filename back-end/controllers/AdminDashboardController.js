import User from "../models/UserModel.js";
import Tenant from "../models/TenantModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import Payment from "../models/PaymentModel.js";

// Get Admin Dashboard
export const getAdminDashboard = async (req, res) => {
    try {
        const totalTenants = await Tenant.countDocuments();

        const activeTenants = await Tenant.countDocuments({
            isActive: true
        });

        const pendingTenants = await Tenant.countDocuments({
            isActive: false
        });

        const totalSellers = await User.countDocuments({
            role: "seller"
        });

        const totalCustomers = await User.countDocuments({
            role: "customer"
        });

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const successfulPayments = await Payment.find({
            status: "success"
        }).select("amount");

        const totalSales = successfulPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        return res.status(200).json({
            success: true,
            stats: {
                totalTenants,
                activeTenants,
                pendingTenants,
                totalSellers,
                totalCustomers,
                totalProducts,
                totalOrders,
                totalSales
            }
        });

    } catch (error) {
        console.error("ADMIN DASHBOARD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};