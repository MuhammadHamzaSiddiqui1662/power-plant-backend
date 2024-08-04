import { Schema, model } from "mongoose";

export const profilesSchema = new Schema({
  innovator: {
    type: Boolean,
  },
  investor: {
    type: Boolean,
  },
  broker: {
    type: Boolean,
  },
});

export const certificateSchema = new Schema({
  category: {
    type: String,
    required: [true, "Type is a required field"],
  },
  imageUrl: {
    type: String,
    required: [true, "ImageUrl is a required field"],
  },
});

export const reviewSchema = new Schema(
  {
    dealSuccessFul: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
    },
    behaviour: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
      required: [true, "Behaviour is a required feild."],
    },
    priceNegotiation: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
      required: [true, "Price Negotiation is a required feild."],
    },
    responsiveness: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
      required: [true, "Responsiveness is a required feild."],
    },
    communication: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
      required: [true, "Communication is a required feild."],
    },
    technicalSkills: {
      type: Number,
      min: [0, "Minimum value for rating can be 0."],
      max: [5, "Maximum value for rating can be 5."],
      required: [true, "Technical Skills is a required feild."],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is a required field"],
    },
  },
  { timestamps: true }
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
    about: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: "/placeholder-avatar.png",
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      required: [true, "Status is a required field"],
    },
    subscriber: {
      type: Boolean,
      default: false,
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
    brokerStatus: {
      type: String,
    },
    reviewsAsInvestor: {
      type: [reviewSchema],
    },
    reviewsAsBorker: {
      type: [reviewSchema],
    },
    reviewsAsInnovator: {
      type: [reviewSchema],
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
