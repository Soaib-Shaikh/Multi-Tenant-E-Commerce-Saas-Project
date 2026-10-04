import User from "../models/UserModel.js";
import Tenant from "../models/TenantModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";
import Payment from "../models/PaymentModel.js";
import Category from "../models/CategoryModel.js";

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

// Get All Products
export const getAllAdminProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("tenantId", "name")
            .populate("categoryId", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error("ADMIN PRODUCTS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Orders
export const getAllAdminOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("tenantId", "name")
            .populate("customerId", "name email")
            .populate("items.productId", "name images price")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error("ADMIN ORDERS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Any Product (Super Admin)
export const updateAdminProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId, isActive } = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (categoryId) {
            const category = await Category.findOne({
                _id: categoryId,
                tenantId: product.tenantId,
                isActive: true
            });

            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category for this tenant"
                });
            }

            product.categoryId = categoryId;
        }

        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;

        if (price !== undefined) {
            if (!Number.isFinite(Number(price)) || Number(price) < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product price"
                });
            }
            product.price = Number(price);
        }

        if (stock !== undefined) {
            if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product stock"
                });
            }
            product.stock = Number(stock);
        }

        if (isActive !== undefined) {
            if (typeof isActive !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "isActive must be true or false"
                });
            }
            product.isActive = isActive;
        }

        await product.save();

        await product.populate([
            { path: "tenantId", select: "name" },
            { path: "categoryId", select: "name" }
        ]);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("ADMIN UPDATE PRODUCT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Any Product (Soft Delete)
export const deleteAdminProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (!product.isActive) {
            return res.status(400).json({
                success: false,
                message: "Product is already inactive"
            });
        }

        product.isActive = false;
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("ADMIN DELETE PRODUCT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

