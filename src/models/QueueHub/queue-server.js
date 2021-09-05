'use strict';

const io = require('socket.io-client');
const uuid = require('uuid').v4;// random uuid

const host = 'http://localhost:3000/caps';
const connectionToCapsNameSpace = io.connect(host);

//create a variable to store the delevired message 
const messageQueue = {
    allMessages: {/*id: 3, messageBody: 'new message'*/}// id , messageBody
};


//listening to all connections
connectionToCapsNameSpace.on('connection' , (socket)=>{
    //log
    connectionToCapsNameSpace.on('newMessage' , (messageBody)=>{
        console.log('message');
        const id = uuid();
        messageQueue.allMessages[id] = messageBody;

        socket.emit('added'); // to disconnect the sender socket after sending the message
        connectionToCapsNameSpace.emit('message' , {id , messageBody}); //if the driver is connected the message will send immediately 
    });

    //Send all the message to the driver once he connected
    socket.on('getAll' , ()=>{
        Object.keys(messageQueue.allMessages).forEach( id =>{
            socket.emit('message' , {id , messageBody : messageQueue.allMessages[id]});
        })
    });

    //Delete the message once it recived to the driver
    socket.on('received' , (id)=>{
        delete messageQueue.allMessages[id];
    });
})