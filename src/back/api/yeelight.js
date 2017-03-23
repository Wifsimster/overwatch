const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

const Light = require('../class/light')
const light = new Light()

module.exports = (socket) => {

    yeelightSearch.on('found', (light) => {
        socket.broadcast.emit('light.found', {
            id: light.getId(),
            model: light.getModel(),
            name: light.getName()
        })
    })

    socket.on('light.getAll', () => {
        let list = light.getAll()
        socket.emit('light.getAll.result', list)
    })

    socket.on('light.getValues', (id) => {
        light.getValues(id).then((values) => {
            console.log('Values', values)
            socket.emit('light.getValues.result', values)
        }).catch((err) => {
            socket.emit('light.getValues.error', new errorHandler(err))
        })
    })

    socket.on('light.toggle', (id) => {
        light.toggle().then((rst) => {
            socket.emit('light.toggle.result', rst)
        }).catch((err) => {
            socket.emit('light.toggle.error', new errorHandler(err))
        })
    })

    socket.on('light.turnOn', (id) => {
        light.turnOn().then((rst) => {
            socket.emit('light.turnOn.result', rst)
        }).catch((err) => {
            socket.emit('light.turnOn.error', new errorHandler(err))
        })
    })

    socket.on('light.turnOff', (id) => {
        light.turnOff().then((rst) => {
            socket.emit('light.turnOff.result', rst)
        }).catch((err) => {
            socket.emit('light.turnOff.error', new errorHandler(err))
        })
    })

    socket.on('light.setName', (options) => {
        light.setName(options.name).then((rst) => {
            socket.emit('light.setName.result', rst)
        }).catch((err) => { 
            socket.emit('light.setName.error', new errorHandler(err))
        })
    })

    socket.on('light.setColorTemperature', (options) => {
        light.setColorTemperature(options.temperature).then((rst) => {
            socket.emit('light.setColorTemperature.result', rst)
        }).catch((err) => { 
            socket.emit('light.setColorTemperature.error', new errorHandler(err))
        })
    })

    socket.on('light.setBrightness', (options) => {
        light.setBrightness(options.brightness).then((rst) => {
            socket.emit('light.setBrightness.result', rst)
        }).catch((err) => { 
            socket.emit('light.setBrightness.error', new errorHandler(err))
        })
    })

    socket.on('light.setRGB', (options) => {
        light.setRGB(options.hex).then((rst) => {
            socket.emit('light.setRGB.result', rst)
        }).catch((err) => { 
            socket.emit('light.setRGB.error', new errorHandler(err))
        })
    })

    socket.on('light.setHSV', (options) => {
        light.setHSV(options.hue, options.staturation).then((rst) => {
            socket.emit('light.setHSV.result', rst)
        }).catch((err) => { 
            socket.emit('light.setHSV.error', new errorHandler(err))
        })
    })
}