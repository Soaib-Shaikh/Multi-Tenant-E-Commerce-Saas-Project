import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import db from "./configs/db.js";

import userRoutes from "./routes/UserRoutes.js";
import tenantRoutes from "./routes/TenantRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes)

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`);
    db();
})