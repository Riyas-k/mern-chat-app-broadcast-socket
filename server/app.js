const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require('cors')

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5174',
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  try {
    socket.on("message", (message, userId) => {console.log(message,userId); socket.emit('message',message)});
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  } catch (error) {
    console.log("socket Error");
  }
});
server.listen(4000, () => {
  console.log("Server started");
});
