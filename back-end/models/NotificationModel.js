import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      default: null,
    },

    type: {
      type: String,
      enum: ["order", "payment", "general"],
      default: "order",
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;