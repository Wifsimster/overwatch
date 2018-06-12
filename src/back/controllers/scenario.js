module.exports = (mqttClient, io) => {
  // require('../scenario/morning')(mqttClient, io)
  // require('../scenario/night')(mqttClient, io)
  require("../scenario/ping")(mqttClient, io)
}
