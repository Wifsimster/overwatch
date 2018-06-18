const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const app = express()
const cors = require('cors')
const router = express.Router()
const http = require('http')
const mqtt = require('./src/back/controllers/mqtt')
const WebSocket = require('ws')
const Controller = require('./src/back/controllers/controller')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static(__dirname + '/'))
app.use(favicon(__dirname + '/src/front/assets/favicon.png'))

const PORT = 8082

const server = http.Server(app)
const wss = new WebSocket.Server({ server })

server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

new Controller(wss)

// mqtt(webSocketServer).then(mqttClient => {
//   require('./src/back/controllers/socket')(mqttClient, io)
//   require('./src/back/controllers/scenario')(mqttClient, io)
// })

// Drop & create tables in DB
//require('./src/back/models/createDatabase')
