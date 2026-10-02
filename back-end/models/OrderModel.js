
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        subtotal: {
            type: Number,
            min: 0
        },

        discountAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        couponCode: {
            type: String,
            default: null
        },

        couponId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
            default: null
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
                "returned"
            ],
            default: "pending"
        },

        shippingAddress: {
            name: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            pincode: String
        },

        cancelRequested: {
            type: Boolean,
            default: false
        },

        returnRequested: {
            type: Boolean,
            default: false
        },

        returnReason: {
            type: String,
            default: ""
        },

        refundStatus: {
            type: String,
            enum: [
                "not_requested",
                "requested",
                "approved",
                "rejected",
                "refunded"
            ],
            default: "not_requested"
        }
    },
    {
        timestamps: true
    }
);

orderSchema.index({ tenantId: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;