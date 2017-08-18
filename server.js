const express = require("express")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const favicon = require("serve-favicon")
const app = (module.exports = express())
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static(__dirname + "/"))
app.use(favicon(__dirname + "/src/front/assets/favicon.png"))

var port = process.env.PORT || 8080
var env = process.env.NODE_ENV

if ("development" == env) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
}
if ("production" == app.get("env")) {
  app.use(errorHandler())
}

// Drop & create tables in DB
//require('./src/back/models/createDatabase')

const server = app.listen(port)

console.log("Server started at 127.0.0.1:8080")

const io = require("socket.io").listen(server)

require("./src/back/controllers/mqtt")(io).then(mqttClient => {
  //   console.log("Mqtt client :", mqttClient)
  require("./src/back/controllers/socket")(mqttClient, io)
  require("./src/back/controllers/scenario")(mqttClient, io)
})
