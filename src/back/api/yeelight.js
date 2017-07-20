const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()
const Light = require('../class/light')
const light = new Light()

module.exports = (socket) => {

    yeelightSearch.on('found', (light) => {
        socket.broadcast.emit('light.found', {
            id: light.id,
            name: light.name,
            model: light.model,
            port: light.port,
            hostname: light.hostname,
            supports: light.supports,
        })
    })

    socket.on('light.getAll', () => {
        let list = light.getAll()
        socket.emit('light.getAll.result', list)
    })

    socket.on('light.toggle', id => {
        light.toggle(id).then(() => {
            socket.emit('light.toggle.result', id)
        }).catch(err => {
            socket.emit('light.toggle.error', err)
        })
    })

    socket.on('light.turnOn', id => {
        light.turnOn(id).then(() => {
            socket.emit('light.turnOn.result', id)
        }).catch(err => {
            socket.emit('light.turnOn.error', err)
        })
    })

    socket.on('light.turnOff', id => {
        light.turnOff(id).then(() => {
            socket.emit('light.turnOff.result', id)
        }).catch(err => {
            socket.emit('light.turnOff.error', err)
        })
    })

    socket.on('light.getValues', options => {
        let promise = light.getValues(options)
        promise.then(data => {
            socket.emit('light.getValues.result', data)
        }).catch(err => {
            socket.emit('light.getValues.error', err)
        })
    })

    socket.on('light.setName', options => {
        light.setName(options).then(data => {
            socket.emit('light.setName.result', data)
        }).catch(err => {
            socket.emit('light.setName.error', err)
        })
    })

    socket.on('light.setColorTemperature', options => {
        light.setColorTemperature(options).then(data => {
            socket.emit('light.setColorTemperature.result', data)
        }).catch(err => {
            socket.emit('light.setColorTemperature.error', err)
        })
    })

    socket.on('light.setBrightness', options => {
        light.setBrightness(options).then(data => {
            socket.emit('light.setBrightness.result', data)
        }).catch(err => {
            socket.emit('light.setBrightness.error', err)
        })
    })

    socket.on('light.setRGB', options => {
        light.setRGB(options).then(data => {
            socket.emit('light.setRGB.result', data)
        }).catch(err => {
            socket.emit('light.setRGB.error', err)
        })
    })

    socket.on('light.setHSV', options => {
        light.setHSV(options).then(data => {
            socket.emit('light.setHSV.result', data)
        }).catch(err => {
            socket.emit('light.setHSV.error', errorHandler(err))
        })
    })
}