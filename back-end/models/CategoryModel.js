import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        description: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
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

categorySchema.index(
    { tenantId: 1, slug: 1 },
    { unique: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;