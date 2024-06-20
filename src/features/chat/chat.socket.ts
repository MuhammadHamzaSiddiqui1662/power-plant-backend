import { Server } from 'socket.io';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

const chatSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Update user online status
        socket.on('userOnline', async (userId) => {
            await User.findByIdAndUpdate(userId, { online: true, lastSeen: new Date() });
            socket.broadcast.emit('userStatusChanged', { userId, online: true });
        });

        // Join a chat room
        socket.on('joinChat', async ({ chatId }) => {
            socket.join(chatId);

            // Emit all previous messages in the chat
            const messages = await Message.find({ chatId }).sort({ timestamp: 1 }).populate('sender');
            socket.emit('previousMessages', messages);
        });

        // Handle incoming messages
        socket.on('sendMessage', async ({ chatId, senderId, content }) => {
            const message = new Message({ chatId, sender: senderId, content });
            await message.save();
            const populatedMessage = await Message.findById(message._id).populate('sender').exec();

            io.to(chatId).emit('newMessage', populatedMessage);
        });

        // Handle message seen
        socket.on('messageSeen', async ({ messageId, userId }) => {
            const message = await Message.findByIdAndUpdate(messageId, { seen: true, seenAt: new Date() });
            if (message) {
                io.to(message.chatId.toString()).emit('messageSeen', { messageId, userId, seenAt: message.seenAt });
            }
        });

        socket.on('disconnect', async () => {
            console.log('A user disconnected');
            // Update user offline status
            const userId = socket.handshake.query.userId;
            await User.findByIdAndUpdate(userId, { online: false, lastSeen: new Date() });
            socket.broadcast.emit('userStatusChanged', { userId, online: false });
        });
    });
};

export default chatSocket;
