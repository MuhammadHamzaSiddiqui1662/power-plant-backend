// src/features/package/package.entity.ts
import { Schema, model } from "mongoose";

const packageSchema = new Schema({
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: [true, "Price is required"],
    },
    features: {
        type: [String],
        required: [true, "Features are required"],
    }
});

export const Package = model("Package", packageSchema);
