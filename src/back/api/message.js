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

        if (data.deviceId) {
            options.include.push({ model: Device, where: { id: data.deviceId } })
        }
        if (data.type) {
            options.where.type = data.type
        }

        Message.findAll(options).then(rst => {
            socket.emit('message.getAll.result.' + data.uuid, rst)
        }).catch(err => {
            socket.emit('message.getAll.error.' + data.uuid, err)
        })
    })

    socket.on('message.update', data => {
        Message.update({ name: data.name }, { where: { id: data.id } })
            .then(data => {
                socket.emit('message.update.result.' + data.uuid, data)
            }).catch(err => {
                socket.emit('message.update.error.' + data.uuid, err)
            })
    })

    socket.on('message.remove', data => {
        Message.destroy({ where: { id: data.id } })
            .then((rst) => {
                socket.emit('message.remove.result.' + data.uuid, rst)
            }).catch((err) => {
                socket.emit('message.remove.error.' + data.uuid, err)
            })
    })

    socket.on('message.removeAll', data => {
        Message.destroy({ where: {} })
            .then((rst) => {
                socket.emit('message.removeAll.result.' + data.uuid, rst)
            }).catch((err) => {
                socket.emit('message.removeAll.error.' + data.uuid, err)
            })
    })
}