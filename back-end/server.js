import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./configs/db.js";

dotenv.config();
import userRoutes from "./routes/UserRoutes.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`);
    db();
})