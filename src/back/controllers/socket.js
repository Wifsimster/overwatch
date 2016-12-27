var Message = require('../models/message')
var Device = require('../models/device')

module.exports = function(io) {

    function getDevices() {
        Device.findAll().then((devices) => { 
            io.emit('get.device', devices)
        }).catch((err) => { console.error(err) })
    }

    function addMessage(data, device) {
        Message.create({
            data: JSON.stringify(data)
        }).then(function(message) {
            message.setDevice(device)
            io.emit('new.message', message)
        }).catch(function(err) { console.error(err) })        
    }

    function addDevice(data) {
        Device.create({
            name: data.name, 
            mac: data.mac, 
            ip: data.ip,
        }).then((device) => {
            getDevices()
            addMessage(data, device)
        }).catch((err) => { console.error(err) })
    }

    function updateDevice(data, device) {
        Device.update({ ip: device.ip }, {
            where: { id: device.id }
        }).then((count, device) => {
            getDevices()
            addMessage(data, device)
        }).catch((err) => { console.error(err) })
    }

    // Dummy data
    setTimeout(() => {
        addDevice({
            mac: '00:00:00:00:00:00',
            ip: '192.168.0.35',
            data: '{"temperature":"25","humidity":"35"}',
        })
        addDevice({
            mac: '00:00:00:00:00:11',
            ip: '192.168.0.36',
            data: '{"temperature":"23.5","humidity":"45"}',
        })   
        addDevice({
            mac: '00:00:00:00:00:22',
            ip: '192.168.0.37',
            data: '{"temperature":"24.3","pressure":"45"}',
        })   
        addDevice({
            mac: '00:00:00:00:00:33',
            ip: '192.168.0.38',
            data: '{"luminosity":"1002"}',
        })    
    }, 2000)


    const mqtt = require('mqtt')
    const mqttClient  = mqtt.connect('mqtt://192.168.0.35:1883')

    mqttClient.subscribe('/#')

    mqttClient.on('message', function (topic, message) {
        let data = JSON.parse(message.toString())

        Device.findAll({ 
            where: { mac: data.mac }
        }).then((devices) => {
            if(devices.length > 0) { updateDevice(data, devices[0]) } 
            else { addDevice(data) }
        }).catch((err) => { console.error(err) })
    })

    io.on('connection', (socket) => {
        require('../api/device')(socket)
        require('../api/message')(socket)
        require('../api/type')(socket)
        require('../api/location')(socket)
    })
}