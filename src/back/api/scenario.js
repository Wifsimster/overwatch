const Scenario = require('../models/scenario')
const Device = require('../models/device')

module.exports = (socket) => {

    socket.on('scenario.getAll', (options) => {
        Scenario.findAll(options)
            .then(scenarii => {
                socket.emit('scenario.getAll.result', scenarii)
            }).catch(err => {
                socket.emit('scenario.getAll.error', err)
            })
    })

    socket.on('scenario.update', (data) => {
        Scenario.findById(data.id).then(rst => {
            socket.emit('scenario.update.result', rst)
        }).catch(err => {
            socket.emit('scenario.update.error', err)
        })
    })

    socket.on('scenario.remove', (data) => {
        Scenario.destroy({ where: { id: data.id } })
            .then(rst => {
                socket.emit('scenario.remove.result', rst)
            }).catch(err => {
                socket.emit('scenario.remove.error', err)
            })
    })
}