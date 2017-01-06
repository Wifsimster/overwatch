var errorHandler = require('./errorHandler')
var Netatmo = require('../models/netatmo')

module.exports = function(socket) {

    socket.on('get.netatmo', (fn) => {
        Netatmo.findOne()
            .then((auth) => { fn(auth) })
            .catch((err) => { console.error(err) })
    })

    socket.on('update.netatmo', (auth) => {
        Netatmo.update(auth, {where: {id: auth.id}})
            .then((rst) => {})
            .catch((err) => { console.error(err) })
    })
}