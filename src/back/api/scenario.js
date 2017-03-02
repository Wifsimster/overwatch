var errorHandler = require('./errorHandler')
var Scenario = require('../models/scenario')

module.exports = function(socket) {

    socket.on('scenario.getAll', (fn) => {
        Device.findAll({ include: [ Type, Location, Message ] })
            .then((devices) => { fn(devices) })
            .catch((err) => { console.error(err) })
    })

    socket.on('scenario.update', (data) => {
        Device.findById(data.id).then((device) => {
            let types = []
            data.types.forEach((type) => { types.push(type.id) })
            device.setTypes(types).then(() => {                
                device.setLocation(data.locationId)
                Device.update({
                    name: data.name,
                    mac: data.mac,
                    ip: data.ip,
                }, { where: { id: data.id } })
                    .then((count, device) => {
                    Device.findAll({ include: [ Type, Location, Message ] }).then((devices) => {
                        socket.broadcast.emit('get.device', devices) 
                    }).catch((err) => { console.error(err) })
                }).catch((err) => { console.error(err) })     
            }).catch((err) => { console.error(err) })
        }).catch((err) => { console.error(err) })
    })

    socket.on('scenario.remove', (device) => {
        Device.destroy({ where: { id: device.id }})
            .then((rst) => {
            Device.findAll({ include: [ Type, Location, Message ] })
                .then((devices) => { socket.broadcast.emit('get.device', devices) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })
}