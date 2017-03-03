var errorHandler = require('./errorHandler')
var Scenario = require('../models/scenario')
var Device = require('../models/device')

module.exports = function(socket) {

    socket.on('scenario.getAll', (fn) => {
        Scenario.findAll({ include: [ Device ] })
            .then((scenarios) => { 
            socket.broadcast.emit('scenario.getAll.result', scenarios)
        }).catch((err) => { socket.broadcast.emit('scenario.getAll.error', err) })
    })

    socket.on('scenario.update', (data) => {
        Scenario.findById(data.id).then((scenario) => {
            Scenario.findAll({ include: [ Device ] })
                .then((scenarios) => {
                socket.broadcast.emit('scenario.update.result', scenarios)                 
            }).catch((err) => { socket.broadcast.emit('scenario.update.error', err) })
        }).catch((err) => { socket.broadcast.emit('scenario.update.error', err) })
    })

    socket.on('scenario.remove', (scenario) => {
        Scenario.destroy({ where: { id: scenario.id }})
            .then((rst) => {
            Scenario.findAll({ include: [ Device ] })
                .then((scenarios) => { socket.broadcast.emit('scenario.remove.result', scenarios) })
                .catch((err) => { socket.broadcast.emit('scenario.remove.error', err) })
        }).catch((err) => { socket.broadcast.emit('scenario.remove.error', err) })
    })
}