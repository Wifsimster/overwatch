const Light = require('../class/light')
const Device = require('../models/device')
const Message = require('../models/message')
const cron = require('node-cron')
const light = new Light()

const LIVING_ROOM_LIGHT = "0x0000000003360d2c"
const HALLWAY_LIGHT = "0x00000000033601d3"

module.exports = (device, io) => {
    if (device && io) {

        // 07h30 from Monday to Friday
        cron.schedule('* 30 7 * * 1-5', () => {
            light.setBrightness({ brightness: 5, id: LIVING_ROOM_LIGHT })
            light.setBrightness({ brightness: 5, id: HALLWAY_LIGHT })
            light.turnOn(LIVING_ROOM_LIGHT)
            light.turnOn(HALLWAY_LIGHT)

            // TODO: Start the coffee machine

            // TODO: Start the computer

            io.emit('notify', {
                message: 'Bonjour, lumières allumées jusqu\'à 09h30 !',
                type: 'success',
                time: 15,
            })
        })

        cron.schedule('* 30 9 * * 1-5', () => {
            light.turnOff(LIVING_ROOM_LIGHT)
            light.turnOff(HALLWAY_LIGHT)

            io.emit('notify', {
                message: 'Bonne journée, lumières éteintes !',
                type: 'success',
                time: 15,
            })
        })

    }
}