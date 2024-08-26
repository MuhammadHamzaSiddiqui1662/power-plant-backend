import { Schema, Types, model } from "mongoose";

const notificationSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    link: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

export const Notification = model("Notification", notificationSchema);
