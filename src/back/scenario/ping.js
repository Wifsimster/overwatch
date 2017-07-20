const Light = require('../class/light')
const Device = require('../models/device')
const Message = require('../models/message')
const cron = require('node-cron')
const light = new Light()

module.exports = (mqttClient, io) => {
    if (mqttClient && io) {

        //        cron.schedule('* * * * * *', () => {
        //
        //            console.log('CRON - Ping')
        //
        //            Device.findAll().then((devices) => {            
        //
        //                devices.map(device => {
        //                    mqttClient.publish('/ping/', JSON.stringify({ mac: device.mac }))
        //                })
        //
        //            }).catch((err) => {
        //                console.error(err)                
        //            })
        //
        //        })

    }
}