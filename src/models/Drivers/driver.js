'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000/caps';

const connectionToCapsNameSpace = io.connect(host);

console.log('Socket-io Client Connected');


connectionToCapsNameSpace.on('pickup', (payload)=>{
    
    setTimeout(() => {
        console.log(`PickUp :  ${payload.orderID}`);
        connectionToCapsNameSpace.emit('in-transit', payload);
    }, 1500);

    setTimeout(() => {
        console.log(`Delivered :  ${payload.orderID}`);
        connectionToCapsNameSpace.emit('delivered', payload);
    }, 3000);
});


// listen to the messages
// connectionToCapsNameSpace.emit('getAll');

connectionToCapsNameSpace.on('message' , (message)=>{
    // console.log('New Message : ',message.messageBody);
    console.log('hi');
    connectionToCapsNameSpace.emit('received', message.id);
})





// connectionToCaps.on('pickup', handlePickUp);

// function handlePickUp(payload) {

//     setTimeout(() => {
//         console.log(`PickUp :  ${payload.orderID}`);
//         connectionToCaps.emit('in-transit', payload);
//     }, 1500);

//     setTimeout(() => {
//         console.log(`Delivered :  ${payload.orderID}`);
//         connectionToCaps.emit('delivered', payload);
//     }, 3000);
// }






// events.on('pickup', payload => {
//     setTimeout(() => {
//         console.log(`DRIVER: picked up ${payload.orderID}`);
//         events.emit('in-transit', payload);
//     }, 1000);

//     setTimeout(() => {
//         console.log(`DRIVER: delivered up ${payload.orderID}`);
//         events.emit('delivered', payload);
//     }, 3000);
// });


// module.exports = events;