const io = require('socket.io')(process.env.PORT || 3000);
const helper = require('./helpers/db_helper');
var moment = require('moment-timezone');
var connectedUsers = {}; 

// socket connection
io.on('connection', socket => {
    // if connected, emit to socket saying connected with the socket.id
    socket.emit('connected', socket.id);
    /*--------------------------New User - Start---------------------------*/
    // when user added, store the socket information in connectedUsers
    socket.on('add-user', userId => {
        if(userId) {
            socket.user_id = userId;
            connectedUsers[userId] = socket;
            // console.log('Added: ' + socket.user_id );
            // console.log(connectedUsers[userId]);
        }
    });
    /*--------------------------New User - End-----------------------------*/
 
    socket.on('send-message1', (message) => {
            console.log(message);
            helper.saveMessage(message.text,message.senderId,message.senderType,message.receiverId,message.receiverType,(result)=>{
            if (result.error) {
            response.status(100).json({ "error": true,"message": "Error in connection database" });
            }else if(result.rows.length === 0){
            response.status(404).json({ "error": true,"message": "No result Found" });
            }else{
            response.status(200).json(result);
            }
            });
                
        if(message.senderId!= undefined && message.receiverId != undefined && connectedUsers[message.receiverId] != undefined) {
            // console.log(connectedUsers[message.receiverId].user_id);
            var cstTimeNow = moment().tz('America/Chicago').format('D MMM YYYY, h:mm a');
            connectedUsers[message.receiverId].emit('message', {msg: message.text, senderId: message.senderId, receiverId: message.receiverId, createdAt: cstTimeNow});
        }
    });
    socket.on('start typing', roomId => {
        socket.broadcast.to(roomId).emit('new typing', socket.user_id);
    });

    socket.on('stop typing', roomId => {
        socket.broadcast.to(roomId).emit('end typing', socket.user_id);
    });

    socket.on('need update rooms', () => {
        socket.emit('update rooms', rooms);
    });

    socket.on('need update users', () => {
        socket.emit('update users', users);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {

        console.log('deconnection');
        //numUsers--;



    });
});


 
