import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is a required field"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is a required field"],
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
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    earning: {
        type: Number,
    },
    listing: {
        type: Number,
    },
    status: {
        type: String,
        required: [true, "Status is a required field"],
    },
}, { timestamps: true });

export const User = model("User", userSchema);
