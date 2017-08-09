const Message = require("../models/message")
const Device = require("../models/device")
const Type = require("../models/type")
const Location = require("../models/location")
const scenario = require("../controllers/scenario")
const mqtt = require("mqtt")
const jsonfile = require("jsonfile")
const file = "config/default.json"
const Promise = require("promise")

module.exports = io => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, obj) => {
      if (!err) {
        let settings = obj.settings.mqtt
        let mqttUrl = `mqtt://${settings.ip}:${settings.port}`
        let mqttClient = mqtt.connect(mqttUrl)

        resolve(mqttClient)

        mqttClient.subscribe("/#")

        mqttClient.on("connected", () => {
          io.emit("mqtt.connected")
        })

        mqttClient.on("reconnecting", () => {
          io.emit("mqtt.reconnecting")
        })

        mqttClient.on("close", () => {
          io.emit("mqtt.close")
        })

        mqttClient.on("offline", () => {
          io.emit("mqtt.offline")
        })

        mqttClient.on("error", () => {
          io.emit("mqtt.error")
        })

        mqttClient.on("message", (topic, message) => {
          console.log("- MQTT : New message")
          try {
            let data = JSON.parse(message.toString())
            if (data.mac) {
              Device.findOne({ where: { mac: data.mac } })
                .then(device => {
                  if (device) {
                    if (topic.startsWith("/online/")) {
                      addMessage(data, device, "online")
                      notify({
                        message: device.name + " is online !",
                        data: device
                      })
                    }
                    if (topic.startsWith("/ping/")) {
                      console.log("MQTT - Ping : " + JSON.stringify(data))
                      updateDevice(data, device, "ping")
                    }
                    if (topic.startsWith("/data/")) {
                      console.log("MQTT - Data : " + JSON.stringify(data))
                      updateDevice(data, device, "data")
                    }
                    if (topic.startsWith("/ip/")) {
                      console.log("MQTT - IP : " + JSON.stringify(data))
                      updateDevice(data, device, "ip")
                    }
                    if (topic.startsWith("/name/")) {
                      console.log("MQTT - Name : " + JSON.stringify(data))
                      updateDevice(data, device, "name")
                    }
                    if (topic.startsWith("/type/")) {
                      console.log("MQTT - Type : " + JSON.stringify(data))
                      updateDevice(data, device, "type")
                    }
                    if (topic.startsWith("/lwt/")) {
                      console.log("MQTT - Offline : ", device.name)
                      updateDevice(data, device, "offline")
                    }
                  } else {
                    addDevice(data, "new")
                    console.log("MQTT - New device : " + JSON.stringify(data))
                    notify({
                      message: "New device detected !",
                      data: data
                    })
                  }
                })
                .catch(err => {
                  console.error(err)
                })
            } else {
              console.log("MQTT - Unknow : " + JSON.stringify(data))
            }
          } catch (SyntaxError) {
            console.error("MQTT - Message can't be parse to object !")
          }
        })

        function notify(data) {
          io.emit("notify", {
            message: data.message,
            type: "success",
            time: 10,
            data: data.data
          })
        }

        function getDevices() {
          Device.findAll({
            include: [Type, Location, Message]
          })
            .then(devices => {
              io.emit("device.getAll.result", devices)
            })
            .catch(err => {
              io.emit("device.getAll.error", err)
            })
        }

        function addMessage(data, device, type) {
          Message.create({
            data: JSON.stringify(data),
            type: type
          })
            .then(message => {
              message.setDevice(device.id).then(rst => {
                io.emit("message.add.result", message)
                let d = JSON.parse(JSON.stringify(device))
                message.data = JSON.parse(message.data)
                d.message = message
                scenario(d, io)
              })
            })
            .catch(err => {
              io.emit("message.add.error", err)
            })
        }

        function addDevice(data, type) {
          if (data.mac && data.ip && data.name && data.type) {
            Device.create({
              mac: data.mac,
              ip: data.ip,
              name: data.name
            })
              .then(device => {
                Type.findOne({ where: { key: data.type } })
                  .then(type => {
                    if (type) {
                      console.log("MQTT - Type added :", type.name)
                      device.addType(type.id)
                    } else {
                      console.log("MQTT - No type found !")
                    }
                    addMessage(data, device, type)
                    io.emit("device.add.result", device)
                  })
                  .catch(err => {
                    console.error(err)
                  })
              })
              .catch(err => {
                io.emit("device.add.error", err)
              })
          }
        }

        function updateDevice(data, device, type) {
          let updateObject = {}
          if (data.ip) {
            updateObject.ip = data.ip
          }
          if (data.name) {
            updateObject.name = data.name
          }
          Device.update(updateObject, { where: { id: device.id } })
            .then((count, rows) => {
              if (data.type) {
                Type.findOne({ where: { key: data.type } })
                  .then(type => {
                    if (type) {
                      console.log("MQTT - Type added :", type.name)
                      device.addType(type.id)
                    } else {
                      console.log("MQTT - No type found !")
                    }
                  })
                  .catch(err => {
                    console.error(err)
                  })
              }
              Device.findById(device.id, { include: [Type, Location] })
                .then(device => {
                  addMessage(data, device, type)
                  io.emit("device.update.result", device)
                })
                .catch(err => {
                  io.emit("device.update.error", err)
                })
            })
            .catch(err => {
              io.emit("device.update.error", err)
            })
        }
      } else {
        console.error(err)
        reject(err)
      }
    })
  })
}
