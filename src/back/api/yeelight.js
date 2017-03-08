const errorHandler = require('./errorHandler')
const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = function (socket) {

    yeelightSearch.on('found', (light) => {
        socket.broadcast.emit('light.found', {
            id: light.getId(),
            model: light.getModel(),
            name: light.getName()
        })
    })

    socket.on('light.getAll', () => {
        const lights = yeelightSearch.getYeelights()
        let list = []
        lights.map((light) => {
            list.push({
                id: light.getId(),
                model: light.getModel(),
                name: light.getName()
            })
        })
        socket.emit('light.getAll.result', list)
    })

    socket.on('light.getValues', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            light.getValues(["power", "bright"]).then((values) => {
                console.log('Values', values)
                socket.emit('light.getValues.result', values)
            }).catch((err) => {
                socket.emit('light.getValues.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.toggle', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            console.log('Light to toggle', light.getId())
            light.toggle().then((rst) => {
                socket.emit('light.toggle.result', rst)
            }).catch((err) => {
                socket.emit('light.toggle.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.turnOn', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            light.turnOn().then((rst) => {
                socket.emit('light.turnOn.result', rst)
            }).catch((err) => {
                socket.emit('light.turnOn.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.turnOff', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            light.turnOff().then((rst) => {
                socket.emit('light.turnOff.result', rst)
            }).catch((err) => {
                socket.emit('light.turnOff.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.setName', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setName(options.name).then((rst) => {
                socket.emit('light.setName.result', rst)
            }).catch((err) => { 
                socket.emit('light.setName.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.setColorTemperature', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setColorTemperature(options.temperature).then((rst) => {
                socket.emit('light.setColorTemperature.result', rst)
            }).catch((err) => { 
                socket.emit('light.setColorTemperature.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.setBrightness', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setBrightness(options.brightness).then((rst) => {
                socket.emit('light.setBrightness.result', rst)
            }).catch((err) => { 
                socket.emit('light.setBrightness.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.setRGB', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setRGB(options.hex).then((rst) => {
                socket.emit('light.setRGB.result', rst)
            }).catch((err) => { 
                socket.emit('light.setRGB.error', new errorHandler(err))
            })
        }
    })

    socket.on('light.setHSV', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setHSV(options.hue, options.staturation).then((rst) => {
                socket.emit('light.setHSV.result', rst)
            }).catch((err) => { 
                socket.emit('light.setHSV.error', new errorHandler(err))
            })
        }
    })
}