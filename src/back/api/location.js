var errorHandler = require('./errorHandler')
var Location = require('../models/location')

module.exports = function(socket) {

  socket.on('get.location', (fn) => {
    Location.findAll()
      .then((locations) => { fn(locations) })
      .catch((err) => { console.error(err) })
  })

  socket.on('update.location', (location) => {
    Location.update({name: location.name}, {where: {id: location.id}})
      .then((rst) => {})
      .catch((err) => { console.error(err) })
  })

  socket.on('remove.location', (location) => {
    Location.destroy({ where: { id: location.id }})
      .then((rst) => {
      Location.findAll()
        .then((locations) => { socket.emit('get.location', locations) })
        .catch((err) => { console.error(err) })
    })
      .catch((err) => { console.error(err) })
  })

  socket.on('removeAll.location', () => {
    Location.destroy({where: {}})
      .then((rst) => {
      Location.findAll()
        .then((locations) => { socket.emit('get.location', locations) })
        .catch((err) => { console.error(err) })
    })
      .catch((err) => { console.error(err) })
  })
}