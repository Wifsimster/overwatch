const Message = require('../models/message')
const Device = require('../models/device')
const Location = require('../models/location')
const Type = require('../models/type')
const errorHandler = require('../api/errorHandler')
const mqtt = require('mqtt')
const mqttClient = mqtt.connect('mqtt://192.168.0.35:1883')

const EventEmitter = require('events')
const emitter = new EventEmitter()
const Light = require('../class/light')
const light = new Light()
const sleep = require('system-sleep')

module.exports = (io) => {

    function getDevices() {
        Device.findAll({
            include: [Type, Location, Message]
        }).then((devices) => {
            io.emit('device.getAll.result', devices)
        }).catch((err) => {
            io.emit('device.getAll.error', new errorHandler(err))
        })
    }

    function getMessages() {
        Message.findAll({
            order: 'message.createdAt DESC',
            include: [Device]
        }).then((messages) => {
            io.emit('message.getAll.result', messages)
        }).catch((err) => {
            io.emit('message.getAll.error', new errorHandler(err))
        })
    }

    function addMessage(data, device) {
        Message.create({
            data: JSON.stringify(data)
        }).then((message) => {
            message.setDevice(device.id).then((rst) => {
                io.emit('message.add.result', rst)
            })
        }).catch((err) => {
            io.emit('message.add.error', new errorHandler(err))
        })
    }

    function addDevice(data) {
        Device.create({
            name: data.name,
            mac: data.mac,
            ip: data.ip,
        }).then((device) => {
            addMessage(data, device)
            io.emit('device.add.result', device)
        }).catch((err) => {
            io.emit('device.add.error', new errorHandler(err))
        })
    }

    function updateDevice(data, device) {
        Device.update({
            ip: device.ip
        }, {
            where: {
                id: device.id
            }
        }).then((count) => {
            addMessage(data, device)
            io.emit('device.update.result', count)            
            let d = JSON.parse(JSON.stringify(device))
            d.data = data   
            emitter.emit('scenario.event', d)
        }).catch((err) => {
            io.emit('device.update.error', new errorHandler(err))
        })
    }

    mqttClient.subscribe('/#')

    mqttClient.on('message', (topic, message) => {
        let data = JSON.parse(message.toString())
        if (data.mac) {
            Device.findAll({
                where: { mac: data.mac }
            }).then((devices) => {
                if (devices.length > 0) {
                    updateDevice(data, devices[0])
                } else {
                    addDevice(data)
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    })

    io.on('connection', (socket) => {
        require('../api/device')(socket)
        require('../api/message')(socket)
        require('../api/type')(socket)
        require('../api/location')(socket)
        require('../api/setting')(socket)
        require('../api/freebox')(socket)
        require('../api/yeelight')(socket)
    })

    emitter.on('scenario.event', (device) => {

        // Motion -> lights on -> 30sec --> lights off
        if(device.mac === '18:fe:34:d3:29:0e') {
            if(device.data.state === '1') {
                
                light.setBrightness({brightness: 10, id: "0x0000000003360d2c"})
                light.setBrightness({brightness: 10, id: "0x00000000033601d3"})
                
                light.turnOn("0x0000000003360d2c")
                light.turnOn("0x00000000033601d3")
                
                sleep(30000)
                
                light.turnOff("0x0000000003360d2c")
                light.turnOff("0x00000000033601d3")
            }
        }
    })
}