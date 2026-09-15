import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index(
    { tenantId: 1, productId: 1 }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;