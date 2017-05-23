const Message = require('../models/message')
const Device = require('../models/device')
const Type = require('../models/type')
const Location = require('../models/location')
const mqtt = require('mqtt')
const mqttClient = mqtt.connect('mqtt://192.168.0.35:1883')
const errorHandler = require('../api/errorHandler')
const scenario = require('../controllers/scenario')

module.exports = (io) => {

    mqttClient.subscribe('/#')

    mqttClient.on('close', () => {
        notify({
            message: 'MQTT disconnection !'
        })
    })

    mqttClient.on('offline', () => {
        notify({
            message: 'MQTT client offline !'
        })
    })

    mqttClient.on('message', (topic, message) => {
        let data = JSON.parse(message.toString())
        if(data.mac) {
            Device.findOne({ where: { mac: data.mac } }).then((device) => {
                if(device) {
                    if(topic.startsWith('/online/')) {
                        notify({
                            message: device.name + ' is online !',
                            data: device
                        })
                    }
                    if(topic.startsWith('/sensors/')) {                        
                        updateDevice(data, device)
                    }
                } else {
                    addDevice(data)
                    notify({
                        message: 'New device detected !',
                        data: data
                    })
                }
            }).catch((err) => { console.error(err) })
        }
    })

    function notify(data) {
        io.emit('notify', {
            message: data.message,
            type: 'success',
            time: 10,
            data: data.data
        }) 
    }

    function getDevices() {
        Device.findAll({
            include: [Type, Location, Message]
        }).then((devices) => {
            io.emit('device.getAll.result', devices)
        }).catch((err) => {
            io.emit('device.getAll.error', errorHandler(err))
        }) 
    }

    function getMessages() {
        Message.findAll({
            order: 'message.createdAt DESC',
            include: [Device]
        }).then((messages) => {
            io.emit('message.getAll.result', messages)
        }).catch((err) => {
            io.emit('message.getAll.error', errorHandler(err))
        })
    }

    function addMessage(data, device) {
        Message.create({
            data: JSON.stringify(data)
        }).then((message) => {
            message.setDevice(device.id).then((rst) => {
                io.emit('message.add.result', message)
                let d = JSON.parse(JSON.stringify(device))
                message.data = JSON.parse(message.data)                
                d.message = message
                scenario(d, io)
            })
        }).catch((err) => {
            io.emit('message.add.error', errorHandler(err))
        })
    }

    function addDevice(data) {
        Device.create({
            mac: data.mac,
            ip: data.ip,
            name: data.name,
        }).then((device) => {

            Type.findOne({ where: { key: data.type } }).then(type => {              
                if(type) {
                    console.log('Type added', type.name)
                    device.addType(type.id)
                } else {
                    console.log('No type found !')
                }
            }).catch(err => {
                console.error(err)
            })

            addMessage(data, device)

            io.emit('device.add.result', device)
        }).catch((err) => {
            io.emit('device.add.error', errorHandler(err))
        })
    }

    function updateDevice(data, device) {
        Device.update({ ip: device.ip }, { where: { id: device.id } }).then((count) => {
            addMessage(data, device)
            io.emit('device.update.result', count)
        }).catch((err) => {
            io.emit('device.update.error', errorHandler(err))
        })
    }
}