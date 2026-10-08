import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        code: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },

        discountType: {
            type: String,
            enum: ["percentage", "fixed"],
            required: true
        },

        discountValue: {
            type: Number,
            required: true,
            min: 0
        },

        minOrderAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        maxDiscount: {
            type: Number,
            default: null,
            min: 0
        },

        usageLimit: {
            type: Number,
            default: null,
            min: 1
        },

        usedCount: {
            type: Number,
            default: 0,
            min: 0
        },

        expiresAt: {
            type: Date,
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Same coupon code can exist in different stores,
// but cannot duplicate inside the same store.
couponSchema.index(
    { tenantId: 1, code: 1 },
    { unique: true }
);

couponSchema.index({ tenantId: 1 });
const Coupon =
    mongoose.models.Coupon ||
    mongoose.model("Coupon", couponSchema);

export default Coupon;