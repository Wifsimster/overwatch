const Device = require("../models/device")
const Type = require("../models/type")
const Location = require("../models/location")
const Message = require("../models/message")

module.exports = socket => {
  socket.on("device.getAll", data => {
    Device.findAll({
      include: [Type, Location]
    })
      .then(devices => {
        let p0 = []

        devices.map(device => {
          p0.push(
            Message.findAll({
              offset: 0,
              limit: 1,
              where: {
                deviceId: device.id,
                type: "data"
              }
            })
          )
        })

        Promise.all(p0)
          .then(results => {
            let states = results.map((messages, index) => {
              return JSON.parse(messages[0].data)
            })
            socket.emit("device.getAll.result." + data.uuid, devices)
          })
          .catch(err => {
            console.error(err)
            socket.emit("device.getAll.error." + data.uuid, err)
          })
      })
      .catch(err => {
        console.error(err)
        socket.emit("device.getAll.error." + data.uuid, err)
      })
  })

  socket.on("device.getOne", data => {
    Device.findById(data.id, {
      include: [Type, Location, Message]
    })
      .then(device => {
        socket.emit("device.getOne.result." + data.uuid, device)
      })
      .catch(err => {
        console.error(err)
        socket.emit("device.getOne.error." + data.uuid, err)
      })
  })

  socket.on("device.update", data => {
    Device.findById(data.id)
      .then(device => {
        let types = []
        data.types.forEach(type => {
          types.push(type.id)
        })
        device
          .setTypes(types)
          .then(() => {
            device.setLocation(data.locationId)
            Device.update(
              {
                name: data.name,
                mac: data.mac,
                ip: data.ip
              },
              { where: { id: data.id } }
            )
              .then((count, rows) => {
                socket.emit("device.update.result", { count: count, rows: rows })
              })
              .catch(err => {
                console.error(err)
                socket.emit("device.getAll.error", err)
              })
          })
          .catch(err => {
            console.error(err)
            socket.emit("device.getAll.error", err)
          })
      })
      .catch(err => {
        console.error(err)
        socket.emit("device.getAll.error", err)
      })
  })

  socket.on("device.remove", data => {
    Device.destroy({ where: { id: data.id } })
      .then(rst => {
        socket.emit("device.remove.result." + data.uuid, rst)
      })
      .catch(err => {
        console.error(err)
        socket.emit("device.remove.error." + data.uuid, err)
      })
  })

  socket.on("device.removeAll", data => {
    Device.destroy({ where: {} })
      .then(rst => {
        socket.emit("device.removeAll.result." + data.uuid, rst)
      })
      .catch(err => {
        console.error(err)
        socket.emit("device.removeAll.error." + data.uuid, err)
      })
  })
}
