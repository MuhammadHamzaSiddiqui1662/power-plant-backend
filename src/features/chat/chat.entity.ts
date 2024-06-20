import { Schema, Types, model } from "mongoose";

const chatSchema = new Schema({
    participants: [{
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }],
});

export const Chat = model("Chat", chatSchema);
