const sleep = require('system-sleep')
const Light = require('../class/light')
const light = new Light()

module.exports = (emitter) => {
    
    emitter.on('scenario.event', (device) => {
        // Motion -> lights on -> 30sec --> lights off        
        if(device.mac === '18:fe:34:d3:29:0e') {
            if(device.message.state === '1') {

                light.setBrightness({brightness: 10, id: "0x0000000003360d2c"})
                light.setBrightness({brightness: 10, id: "0x00000000033601d3"})

                light.turnOn("0x0000000003360d2c")
                light.turnOn("0x00000000033601d3")

                sleep(30000)

                light.turnOff("0x0000000003360d2c")
                light.turnOff("0x00000000033601d3")
            }
        }
    }) 
}