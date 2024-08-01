import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

import { authMiddleware } from "./src/features/auth/auth.middleware";
import { AuthRouter } from "./src/features/auth/auth.controller";
import { UserRouter } from "./src/features/user/user.controller";
import { CardRouter } from "./src/features/card/card.controller";
import path from "path";
import { PackageRouter } from "./src/features/package/package.controller";
import { NotificationRouter } from "./src/features/notification/notification.controller";
import { ChatRouter } from "./src/features/chat/chat.controller";
import { MessageRouter } from "./src/features/message/message.controller";
import chatSocket from "./src/features/chat/chat.socket";
import { CarRouter } from "./src/features/car/car.controller";
import { IPRouter } from "./src/features/ip/ip.controller";

const app = express();

app.use(express.json());
app.use(cors());

// Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
chatSocket(io);

mongoose
  .connect(process.env.DB_CONNECTION || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => console.log(`MongoDB Connected: ${res.connection.host}`))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", authMiddleware, UserRouter);
app.use("/api/v1/cards", authMiddleware, CardRouter);
app.use("/api/v1/ips", IPRouter);
app.use("/api/v1/packages", authMiddleware, PackageRouter);
app.use("/api/v1/notifications", NotificationRouter);
app.use("/api/v1/chats", authMiddleware, ChatRouter);
app.use("/api/v1/messages", authMiddleware, MessageRouter);
app.use("/api/v1/cars", CarRouter);

app.use(
  "/assets/uploads",
  express.static(path.join(__dirname, "assets/uploads"))
);
// app.use(express.static(path.join(__dirname, "public")));
app.use("/", (_, res) => res.send(`<h1>Server running on port ${PORT}</h1>`));
