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
        console.log(`== Message received : ${data}`)

        try {
          data = JSON.parse(data)

          switch (data.object) {
            case 'Settings':
              ws.send(JSON.stringify(Object.assign(data, { results: Settings[data.method]() })))
              break
            case 'Light':
              ws.send(JSON.stringify(Object.assign(data, { results: Yeelight[data.method]() })))
              break
            case 'Freebox':
              ws.send(JSON.stringify(Object.assign(data, { results: Freebox[data.method]() })))
              break
            case 'Device':
              ws.send(JSON.stringify(Object.assign(data, { results: Device[data.method]() })))
              break
            case 'Message':
              ws.send(JSON.stringify(Object.assign(data, { results: Message[data.method]() })))
              break
            case 'Type':
              ws.send(JSON.stringify(Object.assign(data, { results: Type[data.method]() })))
              break
            case 'Location':
              ws.send(JSON.stringify(Object.assign(data, { results: Location[data.method]() })))
              break
            case 'Backup':
              ws.send(JSON.stringify(Object.assign(data, { results: Backup[data.method]() })))
              break
            case 'Scenario':
              ws.send(JSON.stringify(Object.assign(data, { results: Scenario[data.method]() })))
              break
            default:
              console.log('Object invalid :', data.object)
          }
        } catch (err) {
          console.error('Message is not JSON typed !')
        }
      })
    })
  }
}

module.exports = Controller
