module.exports = (mqttClient, socket) => {
  socket.on("mqtt.publish", options => {
    console.log("MQTT - Publish", JSON.stringify(options.message))
    mqttClient.publish(options.topic, JSON.stringify(options.message))
  })

  socket.on("mqtt.status", options => {
    let result = mqttClient.connected
    if (result === true) {
      console.log("MQTT - Connected")
      socket.emit("mqtt.connected")
    } else {
      console.log("MQTT - Offline")
      socket.emit("mqtt.offline")
    }
  })
}
