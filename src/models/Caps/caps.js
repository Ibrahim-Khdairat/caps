'use strict';


const PORT = process.env.PORT || 3000;
console.log('Socket Connected at : ' , PORT);

const io = require('socket.io')(PORT); // http://localhost:3000

//creating CAPS namespace
const CapsNameSpace = io.of('/caps');// http://localhost:3000/caps


CapsNameSpace.on('connection' , (socket)=>{

    console.log('Connected to the CAPS');

    //PickUp
    socket.on('pickup' , (payload)=>{
        console.log('EVENT: ', {
            event: 'pickup',
            time: new Date().toLocaleString(),
            payload: payload,
        });

        CapsNameSpace.emit('pickup',payload)
    })

    //In-Transit
    socket.on('in-transit' , (payload)=>{
        console.log('EVENT: ', {
            event : 'in-transit',
            time : new Date().toLocaleString(),
            payload : payload
        });

        CapsNameSpace.emit('in-transit',payload)  
    })


    //Delivered
    socket.on('delivered' , (payload)=>{
        console.log('EVENT: ', {
            event : 'delivered',
            time : new Date().toLocaleString(),
            payload : payload
        });

        CapsNameSpace.emit('delivered',payload)
    });

    // newOrder 
    socket.on('newOrder' , (payload)=>{
        console.log('EVENT: ', {
            event : 'delivered',
            time : new Date().toLocaleString(),
            payload : payload
        });

        CapsNameSpace.emit('newOrder',payload)
    });
})


// //pickup

// events.on('pickup', payload => {
//     console.log('EVENT:', {
//         event: 'pickup',
//         time: new Date().toLocaleString(),
//         payload: payload,
//     });
// });

// //in-transit

// events.on('in-transit', payload => {
//     console.log('EVENT:', {
//         event: 'in-transit',
//         time: new Date().toLocaleString(),
//         payload: payload,

//     });
// });

// //delivered

// events.on('delivered', payload => {
//     console.log('EVENT:', {
//         event: 'delivered',
//         time: new Date().toLocaleString(),
//         payload: payload,
//     });
// });


// module.exports = events;