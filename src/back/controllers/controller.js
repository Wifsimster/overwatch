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
        try {
          data = JSON.parse(data)
          const object = data.object
          const method = data.method
          const parameters = data.parameters
          let results = null

          console.log(`== Message : ${data.object}.${data.method}()\r`)

          async function executeMethod(data) {
            switch (object) {
              case 'Settings':
                results = Settings[method]()
                break
              case 'Device':
                results = await Device[method](parameters)
                break
              case 'Message':
                results = await Message[method](parameters)
                break
              case 'Light':
                results = await Yeelight[method]()
                break
              case 'Freebox':
                results = await Freebox[method]()
                break
              case 'Type':
                results = await Type[method]()
                break
              case 'Location':
                results = await Location[method]()
                break
              case 'Backup':
                results = await Backup[method]()
                break
              case 'Scenario':
                results = await Scenario[method]()
                break
              default:
                console.log('Object invalid :', object)
            }

            ws.send(JSON.stringify(Object.assign(data, { results: results })))
          }

          executeMethod(data)
        } catch (err) {
          console.error('Message is not JSON typed !', err)
        }
      })
    })
  }
}

module.exports = Controller
