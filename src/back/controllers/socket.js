var Message = require('../models/message')
var Device = require('../models/device')
var Location = require('../models/location')
var Type = require('../models/type')

module.exports = (io) => {

  function getDevices() {
    Device.findAll({ include: [ Type, Location, Message ] })
      .then((devices) => { 
      io.emit('get.device', devices)
    }).catch((err) => { console.error(err) })
  }

  function getMessages() {
    Message.findAll({ order: 'message.createdAt DESC', include: [ Device ] })
      .then((messages) => { 
      io.emit('get.message', messages)      
    }).catch((err) => { console.error(err) })
  }

  function addMessage(data, device) {
    Message.create({
      data: JSON.stringify(data)
    }).then((message) => {
      message.setDevice(device.id).then(() => {
        getDevices()
        getMessages()  
      })      
    }).catch((err) => { console.error(err) })
  }

  function addDevice(data) {
    Device.create({
      name: data.name,
      mac: data.mac, 
      ip: data.ip,
    }).then((device) => {
      addMessage(data, device)
    }).catch((err) => { console.error(err) })
  }

  function updateDevice(data, device) {
    Device.update({ ip: device.ip }, {
      where: { id: device.id }
    }).then((count) => {
      addMessage(data, device)
    }).catch((err) => { console.error(err) })
  }

  const mqtt = require('mqtt')
  const mqttClient  = mqtt.connect('mqtt://192.168.0.35:1883')

  mqttClient.subscribe('/#')

  mqttClient.on('message', (topic, message) => {
    let data = JSON.parse(message.toString())
    if(data.mac) {
      Device.findAll({ 
        where: { mac: data.mac }
      }).then((devices) => {
        if(devices.length > 0) { updateDevice(data, devices[0]) } 
        else { addDevice(data) }
      }).catch((err) => { console.error(err) })
    }
  })

  io.on('connection', (socket) => {
    require('../api/device')(socket)
    require('../api/message')(socket)
    require('../api/type')(socket)
    require('../api/location')(socket)
    require('../api/setting')(socket)
    require('../api/freebox')(socket)
  })
}