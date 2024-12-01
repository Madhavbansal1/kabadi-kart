const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const SocketIo = require("socket.io");

const userRoute = require("./routes/userRoute");
const pickupRoute = require("./routes/pickupRoute");
const collectorRoute = require("./routes/collectorRoute");

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = SocketIo(server, {
  cors: {
    origin: 'http://localhost:5173/', 
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

// Middleware
app.use(express.json());
app.use(cors('*'));

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};




// Real-time Socket.io setup
io.on("connection", (socket) => {
  console.log("Collector connected:", socket.id);

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("Collector disconnected:", socket.id);
  });
});

// Emit a new pickup request to collectors
const notifyNewRequest = (request) => {
  console.log("Emitting new-pickup-request:", request);
  
  const t = io.emit("new-pickup-request", request);
  console.log(t);
  
};

// Emit updated pickup request to collectors
const notifyRequestUpdate = (update) => {

  io.emit("pickup-request-updated", update);
};
// Pass `io` and notify functions to routes
app.use(userRoute);
app.use(pickupRoute(io, notifyNewRequest, notifyRequestUpdate));
app.use(collectorRoute);

// Start server
const PORT = process.env.PORT || 4000;

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// Initialize the server
(async () => {
  await connectToDatabase();
  startServer();
})();
