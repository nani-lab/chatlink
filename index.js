var express = require("express");
var app = express();
var socket = require("socket.io");

});
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static("/public"));

var io = socket(server);

io.on("connection", function (socket) {
    socket.on("chat", function (data) {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data)
    });
});



