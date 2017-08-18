const Light = require("../class/light")
const Device = require("../models/device")
const Message = require("../models/message")
const cron = require("node-cron")
const light = new Light()

module.exports = (mqttClient, io) => {
  if (mqttClient && io) {
    //  ┌────────────── second (optional)
    //  │ ┌──────────── minute
    //  │ │ ┌────────── hour
    //  │ │ │ ┌──────── day of month
    //  │ │ │ │ ┌────── month
    //  │ │ │ │ │ ┌──── day of week
    //  │ │ │ │ │ │
    //  │ │ │ │ │ │
    //  * * * * * *
    // Running every minute
    cron.schedule("*/1 * * * *", () => {
      Device.findAll()
        .then(devices => {
          devices.map(device => {
            if (mqttClient && mqttClient.publish) {
              mqttClient.publish("/ping/", JSON.stringify({ mac: device.mac }))
            }
          })
        })
        .catch(err => {
          console.error(err)
        })
    })
  }
}
