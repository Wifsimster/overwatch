const Settings = require('./settings')
const Yeelight = require('./yeelight')
const Freebox = require('./freebox')

class Controller {
  constructor(wss) {
    wss.on('connection', function connection(ws, req) {
      ws.on('message', function incoming(message) {
        console.log(`New message received : ${message}`)
        message = JSON.parse(message)
        switch (message.object) {
          case 'Settings':
            const settings = new Settings()
            switch (message.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(message, { results: settings.findAll() })))
                break
              default:
                console.log('Method invalid :', message.method)
            }
            break
          case 'Light':
            const yeelight = new Yeelight()
            switch (message.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(message, { results: yeelight.findAll() })))
                break
              default:
                console.log('Method invalid :', message.method)
            }
            break
          default:
            console.log('Object invalid :', message.object)
          case 'Freebox':
            const freebox = new Freebox()
            switch (message.method) {
              case 'findAll':
                ws.send(JSON.stringify(Object.assign(message, { results: freebox.findAll() })))
                break
              default:
                console.log('Method invalid :', message.method)
            }
        }
      })
    })
  }

  // require('../api/device')(socket)
  // require('../api/message')(socket)
  // require('../api/type')(socket)
  // require('../api/location')(socket)
  // require('../api/freebox')(socket)
  // require('../api/yeelight')(socket)
  // require('../api/scenario')(socket)
  // require('../api/mqtt')(mqttClient, socket)
}

module.exports = Controller
