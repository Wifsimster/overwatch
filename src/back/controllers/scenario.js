var io = require('socket.io-client')
var socket = io('http://localhost')

// DON'T FUCKING WORK AT THE MOMENT
// NEED TO !

socket.on('connect', function() {
    console.log('==== CONNECTED TO SERVER !', socket.id)
})

socket.emit('event', 'world')

socket.on('event', function(data) {
    console.log('==== EVENT !', data)
})

socket.on('disconnect', function() {
    console.log('==== DISCONNECTED TO SERVER !')
})

//require('../scenario/motion')(socket)