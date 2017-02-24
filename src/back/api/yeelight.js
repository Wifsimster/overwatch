const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = function (socket) {

    yeelightSearch.on('found', (light) => {
        let object = {
            id: light.getId(),
            model: light.getModel(),
            name: light.getName()
        }
        socket.broadcast.emit('found.light', object)
    })

    socket.on('get.lights', () => {
        const lights = yeelightSearch.getYeelights()
        let list = []
        lights.map((light) => {
            list.push({
                id: light.getId(),
                model: light.getModel(),
                name: light.getName()
            })
        })
        socket.emit('get.lights.return', list)
    })

    socket.on('get.light.values', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        light.getValues(['power', 'bright']).then((values) => {          
            socket.emit('get.light.values.return', values)
        }).catch((err) => {
            socket.emit('get.light.values.error', err)
        })
    })

    socket.on('toggle.light', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            console.log('Light to toggle', light.getId())
            light.toggle().then((rst) => {
                socket.emit('toggle.light.return', rst)
            }).catch((err) => {
                socket.emit('toggle.light.error', err)
            })
        }
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