module.exports = (mqttClient, io) => {
  io.on("connection", socket => {
    console.log("New client", socket.id)
    require("../api/device")(socket)
    require("../api/message")(socket)
    require("../api/type")(socket)
    require("../api/location")(socket)
    require("../api/setting")(socket)
    require("../api/freebox")(socket)
    require("../api/yeelight")(socket)
    require("../api/scenario")(socket)
    require("../api/mqtt")(mqttClient, socket)
  })
}
