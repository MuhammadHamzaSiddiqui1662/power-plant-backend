import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { authMiddleware } from "./src/features/auth/auth.middleware";
import { AuthRouter } from "./src/features/auth/auth.controller";
import { UserRouter } from "./src/features/user/user.controller";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION || "");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", authMiddleware, UserRouter);
