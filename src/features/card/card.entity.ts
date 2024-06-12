import { Schema, model, Types } from "mongoose";
import { encrypt, decrypt } from "../../utils/encryption";

const cardSchema = new Schema({
    cardHolderName: {
        type: String,
        required: [true, "Card holder name is required"],
    },
    cardNumber: {
        type: String,
        required: [true, "Card number is required"],
        unique: true,
        set: (val: string) => encrypt(val),
        get: (val: string) => decrypt(val),
    },
    expiryDate: {
        type: String,
        required: [true, "Expiry date is required"],
    },
    cvv: {
        type: String,
        required: [true, "CVV is required"],
        set: (val: string) => encrypt(val),
        get: (val: string) => decrypt(val),
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

export const Card = model("Card", cardSchema);
