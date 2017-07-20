const Type = require('../models/type')

module.exports = (socket) => {

    socket.on('type.getAll', (options) => {
        Type.findAll(options)
            .then((types) => {
                socket.emit('type.getAll.result', types)
            }).catch((err) => {
                socket.emit('type.getAll.error', err)
            })
    })

    socket.on('type.update', (data) => {
        Type.update({ name: data.name }, { where: { id: data.id } })
            .then((rst) => {
                socket.emit('type.update.result', rst)
            }).catch((err) => {
                socket.emit('type.update.error', err)
            })
    })

    socket.on('type.remove', (data) => {
        Type.destroy({ where: { id: data.id } })
            .then((rst) => {
                socket.emit('type.remove.result', rst)
            }).catch((err) => {
                socket.emit('type.remove.error', err)
            })
    })

    socket.on('type.removeAll', () => {
        Type.destroy({ where: {} })
            .then((rst) => {
                socket.emit('type.removeAll.result', rst)
            }).catch((err) => {
                socket.emit('type.removeAll.error', err)
            })
    })

    socket.on('type.updateAll', (types) => {
        types.forEach((type, index) => {
            Type.update({ name: type.name }, { where: { id: type.id } }).then((count, row) => {
                if (index = types.length - 1) {
                    socket.emit('type.updateAll.result', count)
                }
            }).catch((err) => {
                socket.emit('type.getAll.error', err)
            })
        })
    })
}