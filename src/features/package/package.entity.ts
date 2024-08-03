// src/features/package/package.entity.ts
import { Schema, model } from "mongoose";

const packageSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  amount: {
    type: String,
    required: [true, "Amount is required"],
  },
  features: {
    type: [String],
    required: [true, "Features are required"],
  },
  buttonName: {
    type: String,
    required: [true, "Button Name is required"],
  },
  redirectLink: {
    type: String,
    required: [true, "Redirect Link is required"],
  },
});

export const Package = model("Package", packageSchema);
