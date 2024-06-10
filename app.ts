import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION || "");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + 3000);
})
