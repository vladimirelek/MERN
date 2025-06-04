require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./index");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/messageModel");

const DB_URL = process.env.MONGO_URL.replace(
  "<db_password>",
  process.env.MONGO_PASSWORD
);
mongoose
  .connect(DB_URL)
  .then((data) => {
    console.log("MongoDB je povezan");
  })
  .catch((error) => {
    console.log("Baza nije uspjesno povezana");
  });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Store user socket mappings
const userSockets = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("✅ User connected:", socket.id, "userId:", userId);

  // Store the socket mapping for this user
  if (userId) {
    userSockets.set(userId, socket.id);
  }

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`📥 User ${socket.id} joined room ${roomId}`);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`📤 User ${socket.id} left room ${roomId}`);
  });

  socket.on("send_message", async (data) => {
    try {
      const { room, message, sender, receiver, time, date } = data;

      // Save message to database
      const newMessage = await Message.create({
        room,
        message,
        sender,
        receiver,
        time,
        date,
      });

      if (newMessage) {
        // If message was saved successfully, emit to room
        io.to(room).emit("receive_message", data);
        console.log("💬 Message saved and sent:", message);

        // Send to specific user's socket if they're not in the room
        const receiverSocket = userSockets.get(receiver);
        if (receiverSocket) {
          io.to(receiverSocket).emit("receive_message", data);
        }
      }
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("message_error", { error: "Failed to save message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    // Remove the socket mapping when user disconnects
    if (userId) {
      userSockets.delete(userId);
    }
  });
});

const port = process.env.PORT || 4001;
server.listen(port, (err) => {
  if (err) console.log("Aplikacija nije pokrenuta");
  else console.log("Aplikacija radi na portu 4001");
});
