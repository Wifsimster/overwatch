module.exports = (mqttClient, socket) => {

    socket.on('mqtt.publish', options => {
        console.log('MQTT - Publish message...')
        mqttClient.publish(options.topic, options.message)
    })

    socket.on('mqtt.status', options => {
        let result = mqttClient.connected
        if(result === true) {
            socket.emit('mqtt.connected')
        } else {
            socket.emit('mqtt.offline')
        }
    })

}