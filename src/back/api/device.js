const Device = require("../models/device")
const Type = require("../models/type")
const Location = require("../models/location")
const Message = require("../models/message")

module.exports = socket => {
  socket.on("device.getAll", options => {
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
              if (messages[0] && messages[0].data) {
                return JSON.parse(messages[0].data)
              }
            })
            socket.emit("device.getAll.result." + options.uuid, devices)
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

  socket.on("device.getOne", options => {
    if (options.id) {
      Device.findById(options.id, {
        include: [Type, Location, Message]
      })
        .then(device => {
          socket.emit("device.getOne.result." + options.uuid, device)
        })
        .catch(err => {
          console.error(err)
          socket.emit("device.getOne.error", err)
        })
    } else {
      socket.emit("device.getOne.error")
    }
  })

  socket.on("device.update", options => {
    if (options.data) {
      let data = options.data
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
                  socket.emit("device.update.result." + options.uuid, { count: count, rows: rows })
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
    } else {
      socket.emit("device.getAll.error")
    }
  })

  socket.on("device.remove", options => {
    if (options.data) {
      Device.destroy({ where: { id: options.data.id } })
        .then(rst => {
          socket.emit("device.remove.result." + options.uuid, rst)
        })
        .catch(err => {
          console.error(err)
          socket.emit("device.remove.error", err)
        })
    } else {
      socket.emit("device.remove.error")
    }
  })

  socket.on("device.removeAll", options => {
    Device.destroy({ where: {} })
      .then(rst => {
        socket.emit("device.removeAll.result." + options.uuid, rst)
      })
      .catch(err => {
        console.error(err)
        socket.emit("device.removeAll.error", err)
      })
  })
}
