var express = require("express");
var app = express();
var socket = require("socket.io");


var server = app.listen(8080, function () {
    console.log("Listening on port 3000");
});

app.use(express.static("public"));

var io = socket(server);

io.on("connection", function (socket) {
    socket.on("chat", function (data) {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data)
    });
});



