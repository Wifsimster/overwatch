var Message = require('../models/message')

module.exports = function(io) {

  const mqtt = require('mqtt')
  const mqttClient  = mqtt.connect('mqtt://192.168.0.35:1883')

  mqttClient.subscribe('/#')

  mqttClient.on('message', function (topic, message) {
    let data = JSON.parse(message.toString())
    Message.create(data)
      .then(function(rst) { console.log('New message saved !') })
      .catch(function(err) { console.error(err) })
  })

  io.on('connection', (socket) => {
    console.log('Socket connection open')    


    mqttClient.on('message', function (topic, message) {
      socket.emit('sensors', message.toString())
    })
  })
}