import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"],
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    this.channelSockets = new Map(); // channelId -> Set of socket ids
    this.init();
  }

  init() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error("No token provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
          return next(new Error("User not found"));
        }

        socket.user = user;
        socket.channelId = socket.handshake.query.channelId;
        next();
      } catch (error) {
        console.error("Socket auth error:", error);
        next(new Error("Authentication failed"));
      }
    });

    this.io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);
      this.handleConnection(socket);
    });
  }

  handleConnection(socket) {
    const { channelId } = socket;

    // Join channel room
    socket.on("join channel", (channelId) => {
      socket.join(channelId);
      if (!this.channelSockets.has(channelId)) {
        this.channelSockets.set(channelId, new Set());
      }
      this.channelSockets.get(channelId).add(socket.id);
    });

    // Handle new messages
    socket.on("new message", async (data) => {
      try {
        const message = await Message.create({
          channelId: data.channelId,
          content: data.content,
          sender: socket.user._id,
          readBy: [socket.user._id],
          status: "sent",
        });

        const populatedMessage = await Message.findById(message._id)
          .populate("sender", "firstName lastName media")
          .populate("readBy", "firstName lastName");

        // Emit only to sockets in this channel
        this.io.to(data.channelId).emit("message received", populatedMessage);
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    // Handle channel leave
    socket.on("leave channel", (channelId) => {
      socket.leave(channelId);
      const channelSockets = this.channelSockets.get(channelId);
      if (channelSockets) {
        channelSockets.delete(socket.id);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      if (socket.channelId) {
        const channelSockets = this.channelSockets.get(socket.channelId);
        if (channelSockets) {
          channelSockets.delete(socket.id);
        }
      }
    });
  }
}

export default SocketService;
