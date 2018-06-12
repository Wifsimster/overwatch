const Location = require("../models/location")

module.exports = socket => {
  socket.on("location.getAll", options => {
    Location.findAll(options)
      .then(locations => {
        socket.emit("location.getAll.result." + options.uuid, locations)
      })
      .catch(err => {
        socket.emit("location.getAll.error", err)
      })
  })

  socket.on("location.remove", options => {
    if (options.id) {
      Location.destroy({ where: { id: options.id } })
        .then(rst => {
          socket.emit("location.remove.result." + options.uuid, rst)
        })
        .catch(err => {
          socket.emit("location.remove.error", err)
        })
    } else {
      socket.emit("location.remove.error")
    }
  })

  socket.on("location.removeAll", options => {
    Location.destroy({ where: {} })
      .then(rst => {
        socket.emit("location.removeAll.result." + options.uuid, rst)
      })
      .catch(err => {
        socket.emit("location.removeAll.error", err)
      })
  })

  socket.on("location.update", (options, data) => {
    if (options.data) {
      let data = options.data
      Location.update({ name: data.name }, { where: { id: data.id } })
        .then(rst => {
          socket.emit("location.update.result." + options.uuid, rst)
        })
        .catch(err => {
          socket.emit("location.update.error", err)
        })
    } else {
      socket.emit("location.update.error")
    }
  })

  socket.on("location.updateAll", options => {
    if (options.data) {
      options.data.map((location, index) => {
        Location.findById(location.id).then(loc => {
          if (loc) {
            Location.update({ name: loc.name }, { where: { id: location.id } })
              .then((count, row) => {
                if ((index = location.length - 1)) {
                  if ((index = location.length - 1)) {
                    socket.emit("location.updateAll.result." + options.uuid, count)
                  }
                }
              })
              .catch(err => {
                socket.emit("location.updateAll.error", err)
              })
          } else {
            Location.create({ name: location.name })
              .then((count, row) => {
                if ((index = location.length - 1)) {
                  socket.emit("location.updateAll.result." + options.uuid, count)
                }
              })
              .catch(err => {
                socket.emit("location.updateAll.error", err)
              })
          }
        })
      })
    }
  })
}
