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

    socket.on('get.light.values', (id, fn) => {
        const yeelightSearch = new YeelightSearch()
        const light = yeelightSearch.getYeelightById(id)
        light.getValues(['power', 'bright']).then((values) => {          
            socket.emit('get.light.return', values)
        }).catch((err) => {
            socket.emit('get.light.error', err)
        })
    })

    socket.on('toggle.light', (id) => {
        const yeelightSearch = new YeelightSearch()
        const light = yeelightSearch.getYeelightById(id)
        light.toggle().then((rst) => {
            socket.emit('toggle.light.return', rst)
        }).catch((err) => {
            socket.emit('toggle.light.error', err)
        })
    })

    socket.on('set.light.name', (options, fn) => {
        const yeelightSearch = new YeelightSearch()
        const light = yeelightSearch.getYeelightById(options.id)
        light.setName(options.name).then((rst) => {
            socket.emit('set.light.name.return', rst)
        }).catch((err) => { 
            socket.emit('set.light.name.return', rst)
        })
    })
}