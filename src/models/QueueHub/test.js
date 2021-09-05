const io = require('socket.io-client');

const host = 'http://localhost:3000/caps';
const connectionToCapsNameSpace = io.connect(host);
//fire events
connectionToCapsNameSpace.emit('test');