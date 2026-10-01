import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import db from "./configs/db.js";

import userRoutes from "./routes/UserRoutes.js";
import tenantRoutes from "./routes/TenantRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";
import reviewRoutes from "./routes/ReviewRoutes.js";
import sellerDashboardRoutes from "./routes/SellerDashboardRoutes.js";
import adminDashboardRoutes from "./routes/AdminDashboardRoutes.js";
import couponRoutes from "./routes/CouponRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/seller/dashboard", sellerDashboardRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/coupons", couponRoutes)

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`);
    db();
})