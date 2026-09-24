import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        subdomain: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true,
            trim: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        settings: {
            storeName: String,
            logo: String,
            currency: {
                type: String,
                default: "INR"
            },
            contactEmail: String,
            contactPhone: String
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

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;