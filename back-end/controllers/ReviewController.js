import Review from "../models/ReviewModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/OrderModel.js";

// Create Review
export const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Product ID and rating are required."
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });
        }

        // Check product
        const product = await Product.findOne({
            _id: productId,
            tenantId: req.tenantId,
            isActive: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // Check customer purchase
        const order = await Order.findOne({
            tenantId: req.tenantId,
            customerId: req.user.userId,
            "items.productId": productId,
            status: {
                $in: ["confirmed", "processing", "shipped", "delivered"]
            }
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You can review only products you have purchased."
            });
        }

        // Check existing review
        const existingReview = await Review.findOne({
            tenantId: req.tenantId,
            productId,
            customerId: req.user.userId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product."
            });
        }

        // Create review
        const review = await Review.create({
            tenantId: req.tenantId,
            productId,
            customerId: req.user.userId,
            rating,
            comment: comment || ""
        });

        const populatedReview = await Review.findById(review._id)
            .populate("customerId", "name email")
            .populate("productId", "name");

        return res.status(201).json({
            success: true,
            message: "Review added successfully.",
            review: populatedReview
        });

    } catch (error) {
        console.error("CREATE REVIEW ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Product Reviews
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check product
        const product = await Product.findOne({
            _id: productId,
            tenantId: req.tenantId,
            isActive: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const reviews = await Review.find({
            tenantId: req.tenantId,
            productId
        })
            .populate("customerId", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {
        console.error("GET PRODUCT REVIEWS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Review
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });
        }

        const review = await Review.findOne({
            _id: id,
            tenantId: req.tenantId,
            customerId: req.user.userId
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found."
            });
        }

        if (rating !== undefined) {
            review.rating = rating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        return res.status(200).json({
            success: true,
            message: "Review updated successfully.",
            review
        });

    } catch (error) {
        console.error("UPDATE REVIEW ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findOne({
            _id: id,
            tenantId: req.tenantId,
            customerId: req.user.userId
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found."
            });
        }

        await review.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully."
        });

    } catch (error) {
        console.error("DELETE REVIEW ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};