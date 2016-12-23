var Message = require('../models/message')
var Device = require('../models/device')

module.exports = function(io) {

  const mqtt = require('mqtt')
  const mqttClient  = mqtt.connect('mqtt://192.168.0.35:1883')

  mqttClient.subscribe('/#')

  mqttClient.on('message', function (topic, message) {
    let data = JSON.parse(message.toString())    
    Message.create(data)
      .then(function(rst) { console.log('New message saved !') })
      .catch(function(err) { console.error(err) })

    Device.findAll({ where: { mac: data.mac }}).then((devices) => {
      if(devices.length > 0) {
        // TODO : Update device info
      } else {
        Device.create({ mac: data.mac, ip: data.ip }).then((rst) => {
          console.log('New device added !')
        }).catch((err) => {
          console.error(err)
        })
      }
    }).catch((err) => {
      console.error(err)
    })

  })

  // Client connection detected
  io.on('connection', (socket) => {

    Device.findAll().then((devices) => {
      socket.emit('devices', devices)
    }).catch((err) => {
      console.error(err)
    })

    Message.findAll().then((messages) => {
      socket.emit('messages', messages)
    }).catch((err) => {
      console.error(err)
    })

    mqttClient.on('message', (topic, message) => {
      socket.emit('mqttMessage', message.toString())
    }, (err) => {
      console.error(err)
    })
  })
}