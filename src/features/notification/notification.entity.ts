import { Schema, Types, model } from "mongoose";

const notificationSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    link: {
        type: String,
        required: [true, "Link is required"],
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
});

export const Notification = model("Notification", notificationSchema);
