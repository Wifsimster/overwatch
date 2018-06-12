const Scenario = require("../models/scenario")
const Device = require("../models/device")

module.exports = socket => {
  socket.on("scenario.getAll", options => {
    Scenario.findAll(options)
      .then(scenarii => {
        socket.emit("scenario.getAll.result." + options.uuid, scenarii)
      })
      .catch(err => {
        socket.emit("scenario.getAll.error", err)
      })
  })

  socket.on("scenario.update", options => {
    if (options.data) {
      Scenario.findById(data.id)
        .then(rst => {
          socket.emit("scenario.update.result." + options.uuid, rst)
        })
        .catch(err => {
          socket.emit("scenario.update.error", err)
        })
    } else {
      socket.emit("scenario.update.error")
    }
  })

  socket.on("scenario.remove", options => {
    if (options.id) {
      Scenario.destroy({ where: { id: options.id } })
        .then(rst => {
          socket.emit("scenario.remove.result." + options.uuid, rst)
        })
        .catch(err => {
          socket.emit("scenario.remove.error", err)
        })
    } else {
      socket.emit("scenario.remove.error")
    }
  })
}
