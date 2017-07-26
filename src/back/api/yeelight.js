const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()
const Light = require('../class/light')
const light = new Light()

module.exports = socket => {

    yeelightSearch.on('found', light => {
        console.log('Yeelight - On found')
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
        console.log('Yeelight - Get all')
        light.getAll().then(data => {
            socket.emit('light.getAll.result', data)
        }).catch(err => {
            console.error(err)
            socket.emit('light.getAll.error', err)
        })
    })

    socket.on('light.getValues', id => {
        console.log('Yeelight - Get values :', id)
        light.getValues(id).then(bulb => {
            bulb.once('response', (id, result) => {
                if (result[0] !== 'ok') {
                    let data = {}
                    if (result[0]) { data.power = result[0] }
                    if (result[1]) { data.bright = result[1] }
                    if (result[2]) { data.rgb = result[2] }
                    if (result[3]) { data.color_mode = result[3] }
                    if (result[4]) { data.hue = result[4] }
                    if (result[5]) { data.sat = result[5] }
                    if (result[6]) { data.ct = result[6] }
                    socket.emit('light.getValues.result.' + bulb.id, data)
                }
            })
        }).catch(err => {
            console.error('Error :', err)
            socket.emit('light.getValues.error.' + err)
        })
    })

    socket.on('light.toggle', id => {
        console.log('Yeelight - Toggle :', id)
        light.toggle(id).then(() => {
            socket.emit('light.toggle.result.' + id)
        }).catch(err => {
            socket.emit('light.toggle.error.' + err)
        })
    })

    socket.on('light.refresh', id => {
        console.log('Yeelight - Refresh :', id)
        light.refresh(id).then(() => {
            socket.emit('light.refresh.result.' + id)
        }).catch(err => {
            socket.emit('light.refresh.error.' + err)
        })
    })

    socket.on('light.turnOn', id => {
        console.log('Yeelight - Turn on :', id)
        light.turnOn(id).then(() => {
            socket.emit('light.turnOn.result.' + id)
        }).catch(err => {
            socket.emit('light.turnOn.error.' + err)
        })
    })

    socket.on('light.turnOff', id => {
        console.log('Yeelight - Turn off :', id)
        light.turnOff(id).then(() => {
            socket.emit('light.turnOff.result.' + id)
        }).catch(err => {
            socket.emit('light.turnOff.error.' + err)
        })
    })

    socket.on('light.setName', options => {
        console.log('Yeelight - Set name :', options.id)
        light.setName(options).then(() => {
            socket.emit('light.setName.result.' + id)
        }).catch(err => {
            socket.emit('light.setName.error.' + err)
        })
    })

    socket.on('light.setColorTemperature', options => {
        console.log('Yeelight - Set color temperature :', options.id)
        light.setColorTemperature(options).then(() => {
            socket.emit('light.setColorTemperature.result.' + id)
        }).catch(err => {
            socket.emit('light.setColorTemperature.error.' + err)
        })
    })

    socket.on('light.setBrightness', options => {
        console.log('Yeelight - Set brightness :', options.id)
        light.setBrightness(options).then(() => {
            socket.emit('light.setBrightness.result.' + id)
        }).catch(err => {
            socket.emit('light.setBrightness.error.' + err)
        })
    })

    socket.on('light.setRGB', options => {
        console.log('Yeelight - Set RGB :', options.id)
        light.setRGB(options).then(() => {
            socket.emit('light.setRGB.result.' + id)
        }).catch(err => {
            socket.emit('light.setRGB.error.' + err)
        })
    })

    socket.on('light.setHSV', options => {
        console.log('Yeelight - Set HSV :', options.id)
        light.setHSV(options).then(() => {
            socket.emit('light.setHSV.result.' + id)
        }).catch(err => {
            socket.emit('light.setHSV.error.' + err)
        })
    })
}