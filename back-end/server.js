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
import publicCatalogRoutes from "./routes/PublicCatalogRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
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
app.use("/api/public/catalog", publicCatalogRoutes);

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`);
    db();
})
