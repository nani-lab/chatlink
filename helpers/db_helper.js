'use strict';
const mysql = require('mysql');

class Helper {
    constructor() {}

    saveMessage(message, senderId, senderType, receiverId, receiverType){
        var connection = mysql.createConnection({
            host: '148.66.145.4',
            port: '3306',
            user: 'qw_user',
            password: 'Qwick@123',
            database: 'qw_db',
            timezone: 'utc'
        });
        connection.connect();
        const currentDate = new Date(); 
            // console.log("INSERT INTO chat_messages(messages,sender_id,sender_type,receiver_id,receiver_type,created_at) VALUES('"+message+"','"+senderId+"','"+senderType+"','"+receiverId+"','"+receiverType+"','"+currentDate+"')");
        connection.query("INSERT INTO chat_messages(messages,sender_id,sender_type,receiver_id,receiver_type,created_at) VALUES('"+message+"','"+senderId+"','"+senderType+"','"+receiverId+"','"+receiverType+"',UTC_TIMESTAMP())", (err, rows) => {
           // logs     
        });
        connection.end();
    }
}
module.exports = new Helper();
