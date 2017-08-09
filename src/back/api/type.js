const Type = require("../models/type")

module.exports = socket => {
  socket.on("type.getAll", options => {
    Type.findAll(options)
      .then(types => {
        socket.emit("type.getAll.result." + options.uuid, types)
      })
      .catch(err => {
        socket.emit("type.getAll.error", err)
      })
  })

  socket.on("type.update", options => {
    Type.update({ name: options.data.name }, { where: { id: options.data.id } })
      .then(rst => {
        socket.emit("type.update.result." + options.uuid, rst)
      })
      .catch(err => {
        socket.emit("type.update.error", err)
      })
  })

  socket.on("type.remove", options => {
    Type.destroy({ where: { id: options.data.id } })
      .then(rst => {
        socket.emit("type.remove.result." + options.uuid, rst)
      })
      .catch(err => {
        socket.emit("type.remove.error", err)
      })
  })

  socket.on("type.removeAll", options => {
    Type.destroy({ where: {} })
      .then(rst => {
        socket.emit("type.removeAll.result." + options.uuid, rst)
      })
      .catch(err => {
        socket.emit("type.removeAll.error", err)
      })
  })

  socket.on("type.updateAll", options => {
    options.data.forEach((type, index) => {
      Type.update({ name: type.name }, { where: { id: type.id } })
        .then((count, row) => {
          if ((index = types.length - 1)) {
            socket.emit("type.updateAll.result." + options.uuid, count)
          }
        })
        .catch(err => {
          socket.emit("type.getAll.error", err)
        })
    })
  })
}
