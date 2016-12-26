var errorHandler = require('./errorHandler')
var Type = require('../models/type')

module.exports = function(socket) {

    socket.on('get.type', (fn) => {
        Type.findAll()
            .then((types) => { fn(types) })
            .catch((err) => { console.error(err) })
    })

    socket.on('update.type', (type) => {
        Type.update({name: type.name}, {where: {id: type.id}})
            .then((rst) => {})
            .catch((err) => { console.error(err) })
    })

    socket.on('remove.type', (type) => {
        Type.destroy({ where: { id: type.id }})
            .then((rst) => {
            Type.findAll()
                .then((types) => { socket.emit('get.type', types) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('removeAll.type', () => {
        Type.destroy({where: {}})
            .then((rst) => {
            Type.findAll()
                .then((types) => { socket.emit('get.type', types) })
                .catch((err) => { console.error(err) })
        })
            .catch((err) => { console.error(err) })
    })

    socket.on('updateAll.type', (types) => {
        types.forEach((type, index) => {
            Type.update({name: type.name}, { where: { id: type.id}}).then((count, row) => {
                console.log('index', index)
                if(index = types.length - 1) {
                    Type.findAll()
                        .then((types) => { socket.emit('get.type', types) })
                        .catch((err) => { console.error(err) })
                }
            })
                .catch((err) => { console.error(err) })
        })
    })
}