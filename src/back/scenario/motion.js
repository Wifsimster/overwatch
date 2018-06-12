const Light = require('../class/light')
const Device = require('../models/device')
const Message = require('../models/message')
const light = new Light()

const SLEEP_TIMER = 30000
const LIVING_ROOM_LIGHT = "0x0000000003360d2c"
const HALLWAY_LIGHT = "0x00000000033601d3"

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

module.exports = (device, io) => {
    if (device && io) {
        if (device.mac === '18:fe:34:d3:29:0e') {
            if (device.message && device.message.data && device.message.data.state === '1') {

                // Get TSL2561 value
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
                        if (luminosity <= 15) {
                            io.emit('notify', {
                                message: 'Présence détectée. <br>Lumières allumées pour 30s !',
                                type: 'success',
                                time: 15,
                                data: device
                            })

                            light.setBrightness({ brightness: 10, id: LIVING_ROOM_LIGHT })
                            light.setBrightness({ brightness: 10, id: HALLWAY_LIGHT })

                            light.turnOn(LIVING_ROOM_LIGHT)
                            light.turnOn(HALLWAY_LIGHT)

                            sleep(SLEEP_TIMER).then(() => {
                                light.turnOff(LIVING_ROOM_LIGHT)
                                light.turnOff(HALLWAY_LIGHT)
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
            }
        }

    }
}