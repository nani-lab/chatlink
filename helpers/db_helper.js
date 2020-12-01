'use strict';
const mysql = require('mysql');

class Helper {

    constructor() {
        
        this.pool = mysql.createPool({
            connectionLimit: 100,
            host: '148.66.145.4',
            port:'3306',
            user: 'qw_user',
            password: 'Qwick@123',
            database: 'qw_db',
            debug: false
        });
    }

    saveMessage(message, senderId, senderType, receiverId, receiverType){
        const currentDate = new Date();
        /* if (err) {
            callback({ "error": true });
        } */
        this.pool.getConnection((err, connection) => {
            console.log("INSERT INTO chat_messages(messages,sender_id,sender_type,receiver_id,receiver_type) VALUES('"+message+"','"+senderId+"','"+senderType+"','"+receiverId+"','"+receiverType+"')");
            connection.query("INSERT INTO chat_messages(messages,sender_id,sender_type,receiver_id,receiver_type) VALUES('"+message+"','"+senderId+"','"+senderType+"','"+receiverId+"','"+receiverType+"')", (err, rows) => {
                /* if (!err) {
                    callback({"error":false,"rows":rows});
                } */
            });

            connection.on('error',  (err) => {
                callback({ "error": true });
            });
        });
    }

}

module.exports = new Helper();
