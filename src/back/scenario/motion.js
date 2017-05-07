const Light = require('../class/light')
const Device = require('../models/device')
const Message = require('../models/message')
const light = new Light()

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

module.exports = (device, io) => {
    // Motion -> lights on -> 30sec --> lights off
    if(device) {
        if(device.mac === '18:fe:34:d3:29:0e') {            
            if(device.message && device.message.data && device.message.data.state === '1') {
                // Get lux info from 18:fe:34:d7:f1:cd
                Device.findAll({
                    where: { mac: '18:fe:34:d7:f1:cd' },
                }).then((devices) => {
                    let device = devices[0]
                    Message.findAll({
                        order: 'createdAt DESC',
                        limit: 1,
                        where: { deviceId: device.id }
                    }).then((messages) => {                        
                        let data = JSON.parse(messages[0].data)
                        let luminosity = data.luminosity

                        if(luminosity <= 50) {
                            io.emit('notify', {
                                message: 'Lumières allumées !',
                                type: 'success',
                                time: 5,
                                data: device
                            })          
                        }
                    })
                }).catch((err) => {
                    console.error(err)
                    io.emit('notify', {
                        message: err,
                        type: 'error',
                        time: 5,
                    })
                })

                light.setBrightness({brightness: 10, id: "0x0000000003360d2c"})
                light.setBrightness({brightness: 10, id: "0x00000000033601d3"})

                light.turnOn("0x0000000003360d2c")
                light.turnOn("0x00000000033601d3")

                sleep(30000).then(() => {
                    console.log('Wait... then turn off lights !')
                    light.turnOff("0x0000000003360d2c")
                    light.turnOff("0x00000000033601d3")
                })
            }
        }

    }
}