'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000/caps';
const connectionToCapsNameSpace = io.connect(host);

connectionToCapsNameSpace.on('connection', (socket) =>{
    
connectionToCapsNameSpace.on('delivered', (payload) => {

    console.log(`Thank you for delivering ${payload.orderID}`);
});

// connectionToCapsNameSpace.on('test', () => {
    
//     let messageBody = {messageBody:`You have new order to deliver ${newOrder.type}`}
//     connectionToCapsNameSpace.emit('newMessage', messageBody);

// })


connectionToCapsNameSpace.on('newOrder', (newOrder) => {

    console.log('Ordered : ', newOrder);

    let customerOrder = {
        store: process.env.STORE || 'Ibrahim',
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress(),
        orderType: newOrder.type,
        messageBody:`You have new order to deliver ${newOrder.type}`
    };

    let messageBody = {messageBody:`You have new order to deliver ${newOrder.type}`}
    //log
    connectionToCapsNameSpace.emit('newMessage', messageBody);
//log
    setTimeout(() => {
        connectionToCapsNameSpace.emit('pickup', customerOrder);
    }, 1500)


    connectionToCapsNameSpace.on('added', () => {
        connectionToCapsNameSpace.disconnect();
    })

})


})


// setInterval(() => {
//     let customerOrder = {
//         store: process.env.STORE || 'Ibrahim',
//         orderID: faker.datatype.uuid(),
//         customer: faker.name.findName(),
//         address: faker.address.streetAddress(),
//     };
//     connectionToCapsNameSpace.emit('pickup', customerOrder);
// }, 5000);



