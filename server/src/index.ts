import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./config/db";
import codeShareRoomRouter from "./routers/codeShareRoomRouter";
import { getRoomData, updateRoomData } from "./utils/socketTaskMethods";
import { executeCode } from "./controllers/executeCodeController";

const PORT = process.env.PORT || 5000;
const app: Express = express();
const server = http.createServer(app);
configDotenv();
app.use(cookieParser());

// const corsOptions = {
//   origin: ["http://localhost:3002"],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
app.use(cors({
  origin: ["http://localhost:3002", "http://127.0.0.1:3002", "https://codelive-ide.onrender.com"],
  credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected" + socket.id);

  socket.on("joinRoom", async (data) => {
    const response = await getRoomData(data);
    if (response.success) {
      socket.join(data.roomId);
    }
    socket.emit("joinRoomResponse", response);
    socket.broadcast.to(data.roomId).emit("newUserJoined", {
      message: "New user joined",
      socketId: socket.id,
    });
  });

  socket.on("roomDataChange", async (data) => {
    const response = await updateRoomData(data);
    if (response.success) {
      socket.broadcast.to(data.roomId).emit("roomDataChangeResponse", response);
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    socket.broadcast.emit("userDisconnected", {
      message: "User disconnected",
      socketId: socket.id,
    });
  });
});

app.get("/", (req: Request, res: Response) => {
  const message = `
    <div style="text-align: center;">
      <h1>Online IDE API</h1>
    </div>
  `;
  res.send(message);
});
app.get("/api/testing", (req: Request, res: Response) => {
  res.json({ message: "Server responded successfully!" });
});

app.post("/api/execute-code", executeCode);
app.use("/api/codeshareroom", codeShareRoomRouter);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
