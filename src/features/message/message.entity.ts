import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
    chatId: Schema.Types.ObjectId;
    sender: Schema.Types.ObjectId;
    content: string;
    timestamp: Date;
    seen: boolean;
    seenAt: Date | null;
}

const messageSchema = new Schema<IMessage>({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
        required: true,
    },
    seenAt: {
        type: Date,
        default: null,
    },
});

export const Message = model<IMessage>("Message", messageSchema);
