module.exports = (mqttClient, socket) => {
    
    socket.on('mqtt.publish', (options) => {
        console.log('MQTT - Publish message...')
        mqttClient.publish(options.topic, options.message)
    })
    
}