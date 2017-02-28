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
        socket.emit('light.getAll.return', list)
    })

    socket.on('light.getValues', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            light.getValues('power').then((values) => {
                // TODO
                console.log('Values', values)
                socket.emit('light.getValues.return', values)
            }).catch((err) => {
                socket.emit('light.getValues.error', err)
            })
        }
    })

    socket.on('light.toggle', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            console.log('Light to toggle', light.getId())
            light.toggle().then((rst) => {
                socket.emit('light.toggle.return', rst)
            }).catch((err) => {
                socket.emit('light.toggle.error', err)
            })
        }
    })

    socket.on('light.turnOn', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            light.turnOn().then((rst) => {
                socket.emit('light.turnOn.return', rst)
            }).catch((err) => {
                socket.emit('light.turnOn.error', err)
            })
        }
    })

    socket.on('light.turnOff', (id) => {
        const light = yeelightSearch.getYeelightById(id)
        if(light) {
            light.turnOff().then((rst) => {
                socket.emit('light.turnOff.return', rst)
            }).catch((err) => {
                socket.emit('light.turnOff.error', err)
            })
        }
    })

    socket.on('light.setName', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setName(options.name).then((rst) => {
                socket.emit('light.setName.return', rst)
            }).catch((err) => { 
                socket.emit('light.setName.return', rst)
            })
        }
    })

    socket.on('light.setColorTemperature', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setColorTemperature(options.temperature).then((rst) => {
                socket.emit('light.setColorTemperature.return', rst)
            }).catch((err) => { 
                socket.emit('light.setColorTemperature.return', rst)
            })
        }
    })

    socket.on('light.setBrightness', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setBrightness(options.brightness).then((rst) => {
                socket.emit('light.setBrightness.return', rst)
            }).catch((err) => { 
                socket.emit('light.setBrightness.return', rst)
            })
        }
    })

    socket.on('light.setRGB', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setRGB(options.hex).then((rst) => {
                socket.emit('light.setRGB.return', rst)
            }).catch((err) => { 
                socket.emit('light.setRGB.return', rst)
            })
        }
    })

    socket.on('light.setHSV', (options) => {
        const light = yeelightSearch.getYeelightById(options.id)
        if(light) {
            light.setHSV(options.hue, options.staturation).then((rst) => {
                socket.emit('light.setHSV.return', rst)
            }).catch((err) => { 
                socket.emit('light.setHSV.return', rst)
            })
        }
    })
}