const Settings = require('./settings')
const Yeelight = require('./yeelight')
const Freebox = require('./freebox')
const Device = require('./device')
const Message = require('./message')
const Type = require('./type')
const Location = require('./location')
const Backup = require('./backup')
const Scenario = require('./scenario')

class Controller {
  constructor(wss) {
    wss.on('connection', function connection(ws, req) {
      ws.on('message', function incoming(data) {
        console.log(`New data received : ${data}`)
        data = JSON.parse(data)
        switch (data.object) {
          case 'Settings':
            const settings = new Settings()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: settings.findAll() })))
                break
              case 'update':
                ws.send(JSON.stringify(Object.assign(data, { results: settings.update() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Light':
            const yeelight = new Yeelight()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: yeelight.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Freebox':
            const freebox = new Freebox()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: freebox.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Device':
            const device = new Device()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: device.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Message':
            const message = new Message()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: message.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Type':
            const type = new Type()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: type.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Location':
            const location = new Location()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: location.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Backup':
            const backup = new Backup()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: backup.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          case 'Scenario':
            const scenario = new Scenario()
            switch (data.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(data, { results: scenario.findAll() })))
                break
              default:
                console.log('Method invalid :', data.method)
            }
            break
          default:
            console.log('Object invalid :', data.object)
        }
      })
    })
  }
  // require('../api/data')(socket)
  // require('../api/mqtt')(mqttClient, socket)
}

module.exports = Controller
