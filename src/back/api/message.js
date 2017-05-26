const Message = require('../models/message')
const Device = require('../models/device')

module.exports = (socket) => {

    socket.on('message.getAll', (options) => {
        Message.findAll({
            order: 'message.createdAt DESC', 
            include: [ Device ] 
        }).then((messages) => { 
            socket.emit('message.getAll.result', messages)
        }).catch((err) => {
            socket.emit('message.getAll.error', err)
        })
    })

    socket.on('message.update', (data) => {
        Message.update({name: data.name}, {where: {id: data.id}})
            .then((rst) => {
            socket.emit('message.update.result', rst)
        }).catch((err) => {
            socket.emit('message.update.error', err)
        })
    })

    socket.on('message.remove', (message) => {
        Message.destroy({ where: { id: message.id }})
            .then((rst) => {
            socket.emit('message.remove.result', rst)
        }).catch((err) => {
            socket.emit('message.remove.error', err)
        })
    })

    socket.on('message.removeAll', () => {
        Message.destroy({where: {}})
            .then((rst) => {
            socket.emit('message.removeAll.result', rst)
        }).catch((err) => {
            socket.emit('message.removeAll.error', err)
        })
    })
}