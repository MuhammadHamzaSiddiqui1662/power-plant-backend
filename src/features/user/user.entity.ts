import { Schema, model } from "mongoose";

export const certificateSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Type is a required field"],
    },
    imageUrl: {
      type: String,
      required: [true, "ImageUrl is a required field"],
    },
  },
  { _id: false }
);

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
    ratingAsInvestor: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
    },
    ratingAsBorker: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
    },
    ratingAsInnovator: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
    },
    totalBrokersHired: {
      type: String,
    },
    dealsInProgress: {
      type: String,
    },
    successfulDeals: {
      type: String,
    },
    certificates: {
      type: [certificateSchema],
    },
    interests: {
      type: [String],
    },
    brokerIdentityUrl: {
      type: String,
    },
    notificationsAllowed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
