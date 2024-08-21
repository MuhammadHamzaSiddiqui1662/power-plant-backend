import { Server } from "socket.io";
import { Message } from "../message/message.entity";
import { User } from "../user/user.entity";
import { MessageType } from "../../types/message";
import { Chat } from "./chat.entity";
import { ReviewType } from "../../types/review";

const chatSocket = (io: Server) => {
  io.on("connection", (socket) => {
    // Update user online status
    socket.on("userOnline", async (userId) => {
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          online: true,
          lastSeen: new Date(),
        });
        socket.broadcast.emit("userStatusChanged", { userId, online: true });
      }
    });


    socket.on("userOffline", async (userId) => {
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          online: false,
        });
        socket.broadcast.emit("userStatusChanged", { userId, online: false });
      }
    });

    // Join a chat room
    socket.on("joinChat", async ({ chatId }) => {
      if (chatId) {
        socket.join(chatId);

        // Emit all previous messages in the chat
        const messages = await Message.find({ chatId })
          .sort({ timestamp: 1 })
          .populate("sender");
        socket.emit("previousMessages", messages);
      }
    });

    // Join room for unseen count and last message live updates
    socket.on("joinNotificationRoom", async ({ userId }) => {
      if (userId) {
        socket.join(userId);
      }
    });

    // Handle incoming messages
    socket.on(
      "sendMessage",
      async ({ chatId, senderId, type, content, receiverId }) => {
        if (chatId && senderId && type) {
          if (type === MessageType.CloseChat) {
            const prevCloseMessage = await Message.findOne({ chatId, type });
            if (prevCloseMessage)
              await Message.findByIdAndDelete(prevCloseMessage._id);
          }
          const message = new Message(
            type === MessageType.StartChat || type === MessageType.CloseChat
              ? { chatId, sender: senderId, type }
              : { chatId, sender: senderId, type, content }
          );
          await message.save();
          const populatedMessage = await Message.findById(message._id)
            .populate("sender")
            .exec();
          const chat = await Chat.findById(chatId);
          if (chat) {
            chat.unReadMessages++;
            chat.lastMessage = content;
            chat.save();
          }
          io.to(chatId).emit("newMessage", senderId, populatedMessage);
          io.to(receiverId).emit("messageNotification", chat);
        }
      }
    );

    // Handle messages deletion
    socket.on(
      "deleteMessage",
      async ({ chatId, senderId, type, receiverId, messageId }) => {
        if (chatId && senderId && type && receiverId && messageId) {
          const lstMessage = await Message.findOne().sort({ _id: -1 }).limit(1);
          const chat = await Chat.findById(chatId);
          if (chat && lstMessage) {
            chat.unReadMessages--;
            chat.lastMessage = lstMessage?.content ?? "";
            chat.save();
          }
          io.to(receiverId).emit("messageNotification", chat);
          io.to(chatId).emit("messageRemoved", senderId, messageId);
        }
      }
    );


    // Handle deal close
    socket.on("closeDeal", async ({ chatId, review }) => {
      console.log(chatId, review);
      const { userId, reviewType, data } = review;
      const user = await User.findById(userId);
      const chat = await Chat.findById(chatId);

      if (
        user &&
        chat &&
        [
          ReviewType.ReviewsAsInvestor,
          ReviewType.ReviewsAsBorker,
          ReviewType.ReviewsAsInnovator,
        ].includes(reviewType as ReviewType)
      ) {
        user[reviewType as ReviewType].push(data);
        await user.save();
        chat.closed = true;
        await chat.save();

        io.to(chatId).emit("dealClosed", true);
      }
    });

    // Handle message seen
    socket.on("messageSeen", async ({ messageId, userId }) => {
      if (userId && messageId) {
        const message = await Message.findByIdAndUpdate(messageId, {
          seen: true,
          seenAt: new Date(),
        });
        if (message) {
          io.to(message.chatId.toString()).emit("messageSeen", {
            messageId,
            userId,
            seenAt: message.seenAt,
          });
        }
      }
    });

    socket.on("disconnect", async () => {
      // Update user offline status
      const userId = socket.handshake.query.userId;
      await User.findByIdAndUpdate(userId, {
        online: false,
        lastSeen: new Date(),
      });
      socket.broadcast.emit("userStatusChanged", { userId, online: false });
    });
  });
};

export default chatSocket;
