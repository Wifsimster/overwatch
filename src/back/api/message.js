const Message = require("../models/message")
const Device = require("../models/device")

module.exports = socket => {
  socket.on("message.getAll", data => {
    let options = {
      order: [["createdAt", "DESC"]],
      limit: data.limit,
      offset: data.offset,
      include: [],
      where: {}
    }

    if (data.deviceId) {
      options.include.push({ model: Device, where: { id: data.deviceId } })
    }
    if (data.type) {
      options.where.type = data.type
    }

    Message.findAll(options)
      .then(rst => {
        socket.emit("message.getAll.result." + data.uuid, rst)
      })
      .catch(err => {
        console.error(err)
        socket.emit("message.getAll.error", err)
      })
  })

  socket.on("message.update", options => {
    if (options.data) {
      let data = options.data
      Message.update({ name: data.name }, { where: { id: data.id } })
        .then(data => {
          socket.emit("message.update.result." + options.uuid, data)
        })
        .catch(err => {
          socket.emit("message.update.error", err)
        })
    } else {
      socket.emit("message.update.error")
    }
  })

  socket.on("message.remove", options => {
    if (options.id) {
      Message.destroy({ where: { id: options.id } })
        .then(rst => {
          socket.emit("message.remove.result." + options.uuid, rst)
        })
        .catch(err => {
          socket.emit("message.remove.error", err)
        })
    } else {
      socket.emit("message.remove.error")
    }
  })

  socket.on("message.removeAll", options => {
    Message.destroy({ where: {} })
      .then(rst => {
        socket.emit("message.removeAll.result." + options.uuid, rst)
      })
      .catch(err => {
        socket.emit("message.removeAll.error", err)
      })
  })
}
