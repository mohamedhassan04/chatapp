console.clear();
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 8080 || process.env.PORT;

const users = [{}];

/**@desc cors is used for inter communication between url */
app.use(cors());

/**@desc create server with http methode */
const server = http.createServer(app);

/**@desc configuration socket io for chat */
const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `welcome to the chat,${users[socket.id]}`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
  });
});

/**@desc configuration server */
server.listen(port, () => {
  console.log(` hello server is running on ${port}`);
});
