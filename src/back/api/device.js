var errorHandler = require('./errorHandler')
var Device = require('../models/device')
var Type = require('../models/type')
var Location = require('../models/location')
var Message = require('../models/message')

module.exports = function(socket) {

    socket.on('get.device', (fn) => {
        Device.findAll({ include: [ Type, Location, Message ] })
            .then((devices) => { fn(devices) })
            .catch((err) => { console.error(err) })
    })

    socket.on('get.untype.device', (fn) => {
        Device.findAll({ include: [ Type ] })
            .then((devices) => { 
            let rd = []
            devices.forEach((device) => {
                if(device.types && device.types.length === 0) {
                    rd.push(device)
                }
            })
            fn(rd) 
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('update.device', (data) => {
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

    socket.on('remove.device', (device) => {
        Device.destroy({ where: { id: device.id }})
            .then((rst) => {
            Device.findAll({ include: [ Type, Location, Message ] })
                .then((devices) => { socket.broadcast.emit('get.device', devices) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('removeAll.device', () => {
        Device.destroy({where: {}})
            .then((rst) => {
            Device.findAll({ include: [ Type, Location, Message ] })
                .then((devices) => { socket.emit('get.device', devices) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })
}