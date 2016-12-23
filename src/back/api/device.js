var errorHandler = require('./errorHandler')
var Device = require('../models/device')

module.exports = function(socket) {

    socket.on('get.device', (fn) => {
        Device.findAll()
            .then((devices) => { fn(devices) })
            .catch((err) => { console.error(err) })
    })

    socket.on('update.device', (device) => {
        Device.update({name: device.name}, {where: {id: device.id}})
            .then((rst) => {})
            .catch((err) => { console.error(err) })
    })

    socket.on('remove.device', (device) => {
        Device.destroy({ where: { id: device.id }})
            .then((rst) => {
            Device.findAll()
                .then((devices) => { socket.emit('get.device', devices) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('removeAll.device', () => {
        Device.destroy({where: {}})
            .then((rst) => {
            Device.findAll()
                .then((devices) => { socket.emit('get.device', devices) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })
}