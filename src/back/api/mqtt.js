module.exports = (mqttClient, socket) => {

    socket.on('mqtt.publish', options => {
        mqttClient.publish(options.topic, JSON.stringify(options.message))
    })

    socket.on('mqtt.status', options => {
        let result = mqttClient.connected
        if (result === true) {
            socket.emit('mqtt.connected')
        } else {
            socket.emit('mqtt.offline')
        }
    })

}