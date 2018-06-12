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

  socket.on("type.update", (options, data) => {
    Type.update({ name: data.name }, { where: { id: data.id } })
      .then(rst => {
        socket.emit("type.update.result." + options.uuid, rst)
      })
      .catch(err => {
        socket.emit("type.update.error", err)
      })
  })

  socket.on("type.remove", options => {
    Type.destroy({ where: { id: options.id } })
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
    if (options.data) {
      let p0 = []
      options.data.map(type => {
        p0.push(Type.update({ name: type.name }, { where: { id: type.id } }))
      })
      Promise.all(p0)
        .then(result => {
          socket.emit("type.updateAll.result." + options.uuid, result)
        })
        .catch(err => {
          socket.emit("type.updateAll.error", err)
        })
    } else {
      socket.emit("type.updateAll.error")
    }
  })
}
