module.exports = function(io) {

  const mqtt = require('mqtt')
  const mqttClient  = mqtt.connect('mqtt://192.168.0.35:1883')

  const data = {
    "mac":"18:fe:34:d7:f2:1f", "ip":"192.168.0.56", "temperature":"24", "humidity":"34"
  }

  io.on('connection', (socket) => {
    console.log('Socket connection open')    
    mqttClient.subscribe('/#')

    mqttClient.on('message', function (topic, message) {
      socket.emit('sensors', message.toString())
    })
  })
}