const sleep = require('system-sleep')
const Light = require('../class/light')
const Device = require('../models/device')
const light = new Light()

module.exports = (socket) => {

    socket.on('scenario.event', (device) => {+

        console.log('===== Scenario event motion trigger !')

        // Motion -> lights on -> 30sec --> lights off
        if(device.mac === '18:fe:34:d3:29:0e') {

            if(device.message.data.state === '1') {

                socket.emit('notify', {
                    message: 'State : ' + device.message.data.state,
                    type: 'success',
                    time: 5,
                    data: device
                })

                console.log('====> Search TSL data...')

                // Get lux info from 18:fe:34:d7:f1:cd
                Device.findAll({
                    where: { mac: '18:fe:34:d7:f1:cd' }
                }).then((devices) => {
                    console.log('====> Device TSL found !')
                }).catch((err) => {
                    console.log('====> Error TSL found !')
                })

                socket.emit('notify', {
                    message: 'Motion detection',
                    type: 'success',
                    time: 5,
                    data: device
                })

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