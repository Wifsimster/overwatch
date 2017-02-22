const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')

module.exports = function (socket) {

    const yeelightSearch = new YeelightSearch()
    var lights = []

    yeelightSearch.on('found', () => {
        lights = yeelightSearch.getYeelights()
        let object = []
        for(var i = 0; i < lights.length ; i++) {
            object.push({
                id: lights[i].getId(),
                model: lights[i].getModel(),
                name: lights[i].getName()
            })
        }        
        socket.broadcast.emit('found.lights', object)
    })

    socket.on('get.light.values', (id, fn) => {
        const light = yeelightSearch.getYeelightById(id)
        light.getValues(['power', 'bright']).then((values) => {          
            socket.emit('get.light.return', values)
        }).catch((err) => {
            socket.emit('get.light.error', err)
        })
    })

    socket.on('toggle.light', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        light.toggle().then((rst) => {
            socket.emit('toggle.light.return', rst)
        }).catch((err) => {
            socket.emit('toggle.light.error', err)
        })
    })

    socket.on('set.light.name', (options, fn) => {
        const light = yeelightSearch.getYeelightById(options.id)
        light.setName(options.name).then((rst) => {
            socket.emit('set.light.name.return', rst)
        }).catch((err) => { 
            socket.emit('set.light.name.return', rst)
        })
    })
}