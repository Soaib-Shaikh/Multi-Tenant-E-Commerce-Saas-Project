import Coupon from "../models/Couponmodel.js";

// CREATE COUPON - SELLER
export const createCoupon = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            minOrderAmount,
            maxDiscount,
            usageLimit,
            expiresAt
        } = req.body;

        if (
            !code ||
            !discountType ||
            discountValue === undefined ||
            !expiresAt
        ) {
            return res.status(400).json({
                success: false,
                message: "Code, discount type, discount value and expiry date are required."
            });
        }

        if (!["percentage", "fixed"].includes(discountType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid discount type."
            });
        }

        if (discountValue <= 0) {
            return res.status(400).json({
                success: false,
                message: "Discount value must be greater than 0."
            });
        }

        // Percentage cannot be more than 100
        if (discountType === "percentage" && discountValue > 100) {
            return res.status(400).json({
                success: false,
                message: "Percentage discount cannot be more than 100."
            });
        }

        // Check expiry date
        if (new Date(expiresAt) <= new Date()) {
            return res.status(400).json({
                success: false,
                message: "Expiry date must be in the future."
            });
        }

        const couponCode = code.trim().toUpperCase();

        // Check duplicate coupon inside same store
        const existingCoupon = await Coupon.findOne({
            tenantId: req.tenantId,
            code: couponCode
        });

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: "Coupon code already exists."
            });
        }

        const coupon = await Coupon.create({
            tenantId: req.tenantId,
            code: couponCode,
            discountType,
            discountValue,
            minOrderAmount: minOrderAmount || 0,
            maxDiscount: maxDiscount || null,
            usageLimit: usageLimit || null,
            expiresAt,
            isActive: true
        });

        return res.status(201).json({
            success: true,
            message: "Coupon created successfully.",
            coupon
        });

    } catch (error) {
        console.error("CREATE COUPON ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SELLER COUPONS

export const getSellerCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({
            tenantId: req.tenantId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            coupons
        });

    } catch (error) {
        console.error("GET SELLER COUPONS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE COUPON - SELLER

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            discountType,
            discountValue,
            minOrderAmount,
            maxDiscount,
            usageLimit,
            expiresAt,
            isActive
        } = req.body;

        const coupon = await Coupon.findOne({
            _id: id,
            tenantId: req.tenantId
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found."
            });
        }

        if (
            discountType !== undefined &&
            !["percentage", "fixed"].includes(discountType)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid discount type."
            });
        }

        if (
            discountType === "percentage" &&
            discountValue !== undefined &&
            discountValue > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Percentage discount cannot be more than 100."
            });
        }

        if (discountValue !== undefined && discountValue <= 0) {
            return res.status(400).json({
                success: false,
                message: "Discount value must be greater than 0."
            });
        }

        if (
            expiresAt !== undefined &&
            new Date(expiresAt) <= new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "Expiry date must be in the future."
            });
        }

        if (discountType !== undefined) {
            coupon.discountType = discountType;
        }

        if (discountValue !== undefined) {
            coupon.discountValue = discountValue;
        }

        if (minOrderAmount !== undefined) {
            coupon.minOrderAmount = minOrderAmount;
        }

        if (maxDiscount !== undefined) {
            coupon.maxDiscount = maxDiscount;
        }

        if (usageLimit !== undefined) {
            coupon.usageLimit = usageLimit;
        }

        if (expiresAt !== undefined) {
            coupon.expiresAt = expiresAt;
        }

        if (isActive !== undefined) {
            coupon.isActive = isActive;
        }

        await coupon.save();

        return res.status(200).json({
            success: true,
            message: "Coupon updated successfully.",
            coupon
        });

    } catch (error) {
        console.error("UPDATE COUPON ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE COUPON - SELLER

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await Coupon.findOne({
            _id: id,
            tenantId: req.tenantId
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found."
            });
        }

        await coupon.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Coupon deleted successfully."
        });

    } catch (error) {
        console.error("DELETE COUPON ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// VALIDATE COUPON - CUSTOMER

export const validateCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required."
            });
        }

        if (orderAmount === undefined || orderAmount < 0) {
            return res.status(400).json({
                success: false,
                message: "Valid order amount is required."
            });
        }

        const coupon = await Coupon.findOne({
            tenantId: req.tenantId,
            code: code.trim().toUpperCase()
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Invalid coupon code."
            });
        }

        // Active check
        if (!coupon.isActive) {
            return res.status(400).json({
                success: false,
                message: "This coupon is currently inactive."
            });
        }

        // Expiry check
        if (new Date() > coupon.expiresAt) {
            return res.status(400).json({
                success: false,
                message: "This coupon has expired."
            });
        }

        // Usage limit check
        if (
            coupon.usageLimit !== null &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            return res.status(400).json({
                success: false,
                message: "This coupon usage limit has been reached."
            });
        }

        // Minimum order check
        if (orderAmount < coupon.minOrderAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum order amount should be ₹${coupon.minOrderAmount}.`
            });
        }

        // Calculate discount
        let discountAmount = 0;

        if (coupon.discountType === "percentage") {
            discountAmount =
                (orderAmount * coupon.discountValue) / 100;

            // Apply maximum discount limit
            if (
                coupon.maxDiscount !== null &&
                discountAmount > coupon.maxDiscount
            ) {
                discountAmount = coupon.maxDiscount;
            }
        } else {
            discountAmount = coupon.discountValue;
        }

        // Discount cannot exceed order amount
        if (discountAmount > orderAmount) {
            discountAmount = orderAmount;
        }

        const finalAmount = orderAmount - discountAmount;

        return res.status(200).json({
            success: true,
            message: "Coupon applied successfully.",
            coupon: {
                id: coupon._id,
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue
            },
            discountAmount,
            finalAmount
        });

    } catch (error) {
        console.error("VALIDATE COUPON ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};