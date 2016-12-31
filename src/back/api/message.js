var errorHandler = require('./errorHandler')
var Message = require('../models/message')
var Device = require('../models/device')

module.exports = function(socket) {

  socket.on('get.message', (fn) => {
    Message.findAll({ order: 'message.createdAt DESC', include: [ Device ] })
      .then((messages) => { fn(messages) })
      .catch((err) => { console.error(err) })
  })

  socket.on('update.message', (message) => {
    Message.update({name: message.name}, {where: {id: message.id}})
      .then((rst) => {})
      .catch((err) => { console.error(err) })
  })

  socket.on('remove.message', (message) => {
    Message.destroy({ where: { id: message.id }})
      .then((rst) => {
      Message.findAll({ order: 'message.createdAt DESC', include: [ Device ] })
        .then((messages) => { socket.emit('get.message', messages) })
        .catch((err) => { console.error(err) })
    })
      .catch((err) => { console.error(err) })
  })

  socket.on('removeAll.message', () => {
    Message.destroy({where: {}})
      .then((rst) => {
      Message.findAll({ order: 'message.createdAt DESC', include: [ Device ] })
        .then((messages) => { socket.emit('get.message', messages) })
        .catch((err) => { console.error(err) })
    })
      .catch((err) => { console.error(err) })
  })
}