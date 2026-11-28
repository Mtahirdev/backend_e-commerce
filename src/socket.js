import { disconnect } from "mongoose";
import { Server } from "socket.io";

export let io;

let userSocketMap = {};

export let socketInit = async (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "https://frontendofe-commerce.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId && userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", async () => {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        console.log(userSocketMap);
      }
    });
  });
};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];
