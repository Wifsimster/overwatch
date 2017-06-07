const Message = require('../models/message')
const Device = require('../models/device')

module.exports = (socket) => {

    socket.on('message.getAll', data => {

        let options = {
            order: 'message.createdAt DESC',
            limit: data.limit,
            offset: data.offset,
            include: [],
            where: {}
        }

        if(data.deviceId) {
            options.include.push({ model: Device, where: { id: data.deviceId } })
        }
        if(data.type) {
            options.where.type = data.type
        }

        Message.findAll(options).then(data => {
            socket.emit('message.getAll.result', data)
        }).catch(err => {
            socket.emit('message.getAll.error', err)
        })
    })

    socket.on('message.update', (data) => {
        Message.update({name: data.name}, {where: {id: data.id}})
            .then(data => {
            socket.emit('message.update.result', data)
        }).catch(err => {
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