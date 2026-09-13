import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    },
    {
        _id: false
    }
);

const cartSchema = new mongoose.Schema(
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
            type: [cartItemSchema],
            default: []
        },

        totalAmount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

cartSchema.index(
    { tenantId: 1, customerId: 1 },
    { unique: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;