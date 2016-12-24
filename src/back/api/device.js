var errorHandler = require('./errorHandler')
var Device = require('../models/device')
var Type = require('../models/type')
var Location = require('../models/location')

module.exports = function(socket) {

  socket.on('get.device', (fn) => {
    Device.findAll({ include: [ Type, Location ] })
      .then((devices) => { fn(devices) })
      .catch((err) => { console.error(err) })
  })

  socket.on('update.device', (data) => {
    Device.findById(data.id).then((device) => {
      device.setType(data.typeId)
      device.setLocation(data.locationId)

      Device.update({
        name: data.name,
        mac: data.mac,
        ip: data.ip,
      }, { where: { id: data.id } })
        .then((count, device) => {
        Device.findAll({ include: [ Type, Location ] })
          .then((devices) => { socket.broadcast.emit('get.device', devices) })
          .catch((err) => { console.error(err) })
      })
        .catch((err) => { console.error(err) })    
    })
      .catch((err) => { console.error(err) })
  })

  socket.on('remove.device', (device) => {
    Device.destroy({ where: { id: device.id }})
      .then((rst) => {
      Device.findAll({ include: [ Type, Location ] })
        .then((devices) => { socket.emit('get.device', devices) })
        .catch((err) => { console.error(err) })
    })
      .catch((err) => { console.error(err) })
  })

  socket.on('removeAll.device', () => {
    Device.destroy({where: {}})
      .then((rst) => {
      Device.findAll({ include: [ Type, Location ] })
        .then((devices) => { socket.emit('get.device', devices) })
        .catch((err) => { console.error(err) })
    })
      .catch((err) => { console.error(err) })
  })
}