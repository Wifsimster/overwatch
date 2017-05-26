const Location = require('../models/location')

module.exports = (socket) => {

    socket.on('location.getAll', (options) => {
        Location.findAll(options).then((locations) => {
            socket.emit('location.getAll.result', locations)
        }).catch((err) => { 
            socket.emit('location.getAll.error', err)
        })
    })

    socket.on('location.remove', (options) => {
        Location.destroy({ where: { id: options.id }}).then((rst) => {
            socket.emit('location.remove.result', rst)
        }).catch((err) => { 
            socket.emit('location.remove.error', err)
        })
    })

    socket.on('location.removeAll', () => {
        Location.destroy({where: {}}).then((rst) => {
            socket.emit('location.removeAll.result', rst)
        }).catch((err) => { 
            socket.emit('location.removeAll.error', err)
        })
    })

    socket.on('location.update', (data) => {
        Location.update({name: data.name}, { where: {id: data.id} })
            .then((rst) => {
            socket.emit('location.update.result', rst)
        }).catch((err) => { 
            socket.emit('location.update.error', err)
        })
    })

    socket.on('location.updateAll', (locations) => {
        locations.forEach((location, index) => {
            Location.findById(location.id).then((loc) => {            
                if(loc) {
                    Location.update({name: loc.name}, { where: { id: location.id}}).then((count, row) => {
                        if(index = location.length - 1) {
                            if(index = location.length - 1) {
                                socket.emit('location.updateAll.result', count)
                            }    
                        }
                    }).catch((err) => { 
                        socket.emit('location.updateAll.error', err)
                    })
                } else {
                    Location.create({name: location.name})
                        .then((count, row) => {
                        if(index = location.length - 1) {
                            socket.emit('location.updateAll.result', count)
                        }
                    }).catch((err) => { 
                        socket.emit('location.updateAll.error', err)
                    })
                }
            })

        })
    })
}