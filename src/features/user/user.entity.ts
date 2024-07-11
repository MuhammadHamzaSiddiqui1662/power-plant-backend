import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is a required field"],
    },
    type: {
      type: String,
      required: [true, "Type is a required field"],
    },
    birthDate: {
      type: Date,
      required: [true, "Birth date is a required field"],
    },
    imageUrl: {
      type: String,
      default: "/placeholder-avatar.png",
    },
    location: {
      type: String,
    },
    earning: {
      type: Number,
      default: 0,
    },
    listing: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: [true, "Status is a required field"],
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    online: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
