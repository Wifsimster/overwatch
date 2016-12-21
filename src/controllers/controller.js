const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.0.35:1883')

client.on('connect', () => {
  client.subscribe('sensors')
})

client.on('message', (topic, message) => {
  console.log('received message %s %s', topic, message)
  client.end()
})