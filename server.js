const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const app = express()
const router = express.Router()
const http = require('http')
const socket = require('socket.io')
const mqtt = require('./src/back/controllers/mqtt')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static(__dirname + '/'))
app.use(favicon(__dirname + '/src/front/assets/favicon.png'))

const port = 8080
const env = process.env.NODE_ENV

if ('development' == env) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
}
if ('production' == env) {
  app.use(errorHandler())
}

// Drop & create tables in DB
//require('./src/back/models/createDatabase')

const server = http.Server(app)
const io = socket(server)

server.listen(port)

console.log(`Real time server started at ${port}`)

mqtt(io).then(mqttClient => {
  require('./src/back/controllers/socket')(mqttClient, io)
  require('./src/back/controllers/scenario')(mqttClient, io)
})
