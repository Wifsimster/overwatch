class Controller {
  constructor(wss) {
    wss.on('connection', function connection(ws, req) {
      console.log('New client :', req.connection.remoteAddress)
      ws.on('message', function incoming(message) {
        console.log(`New message received : ${message}`)
        switch (message.object) {
          case 'Settings':
            require('./settings')
            break
        }
      })
    })
  }

  // require('../api/device')(socket)
  // require('../api/message')(socket)
  // require('../api/type')(socket)
  // require('../api/location')(socket)
  // require('../api/setting')(socket)
  // require('../api/freebox')(socket)
  // require('../api/yeelight')(socket)
  // require('../api/scenario')(socket)
  // require('../api/mqtt')(mqttClient, socket)
}

module.exports = Controller
