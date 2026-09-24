import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },

        transactionId: {
            type: String,
            default: null,
            unique: true,
            sparse: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "pending",
                "success",
                "failed",
                "refunded"
            ],
            default: "pending"
        },

        paymentMethod: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

paymentSchema.index({ tenantId: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;