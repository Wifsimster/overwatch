const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

class Yeelight {
  constructor(ws) {
    yeelightSearch.on('found', light => {
      console.log('Yeelight - On found')
      ws.send(
        JSON.stringify({
          id: light.id,
          name: light.name,
          model: light.model,
          port: light.port,
          hostname: light.hostname,
          supports: light.supports
        })
      )
    })
  }

  findAll() {
    console.log('Yeelight - Find all')
    return yeelightSearch.getYeelights()
  }

  getValues(id) {
    console.log('Yeelight - Get values :', id)
    const light = yeelightSearch.getYeelightById(id)
    if (light) {
      light
        .getValues('power', 'bright', 'rgb', 'color_mode', 'hue', 'sat', 'ct')
        .then(() => {
          resolve(light)
        })
        .catch(err => {
          console.error('Error :', err)
          reject(id)
        })
    }
  }

  toggle(id) {
    console.log('Yeelight - Toggle :', id)
    light
      .toggle(id)
      .then(() => {
        socket.emit('light.toggle.result.' + id)
      })
      .catch(err => {
        socket.emit('light.toggle.error', err)
      })
  }

  refresh(id) {
    console.log('Yeelight - Refresh :', id)
    light
      .refresh(id)
      .then(() => {
        socket.emit('light.refresh.result.' + id)
      })
      .catch(err => {
        socket.emit('light.refresh.error', err)
      })
  }

  turnOn(id) {
    console.log('Yeelight - Turn on :', id)
    light
      .turnOn(id)
      .then(() => {
        socket.emit('light.turnOn.result.' + id)
      })
      .catch(err => {
        socket.emit('light.turnOn.error', err)
      })
  }

  turnOff(id) {
    console.log('Yeelight - Turn off :', id)
    light
      .turnOff(id)
      .then(() => {
        socket.emit('light.turnOff.result.' + id)
      })
      .catch(err => {
        socket.emit('light.turnOff.error', err)
      })
  }

  setName(options) {
    console.log('Yeelight - Set name :', options.id)
    light
      .setName(options)
      .then(() => {
        socket.emit('light.setName.result.' + options.id)
      })
      .catch(err => {
        socket.emit('light.setName.error', err)
      })
  }

  setColorTemperature(options) {
    console.log('Yeelight - Set color temperature :', options.id)
    light
      .setColorTemperature(options)
      .then(() => {
        socket.emit('light.setColorTemperature.result.' + options.id)
      })
      .catch(err => {
        socket.emit('light.setColorTemperature.error', err)
      })
  }

  setBrightness(options) {
    console.log(' - Yeelight - Set brightness :', options.id)
    light
      .setBrightness(options)
      .then(() => {
        socket.emit('light.setBrightness.result.' + options.id)
      })
      .catch(err => {
        socket.emit('light.setBrightness.error', err)
      })
  }

  setRGB(options) {
    console.log('Yeelight - Set RGB :', options.id)
    light
      .setRGB(options)
      .then(() => {
        socket.emit('light.setRGB.result.' + options.id)
      })
      .catch(err => {
        socket.emit('light.setRGB.error', err)
      })
  }

  setHSV(options) {
    console.log('Yeelight - Set HSV :', options.id)
    light
      .setHSV(options)
      .then(() => {
        socket.emit('light.setHSV.result.' + options.id)
      })
      .catch(err => {
        socket.emit('light.setHSV.error', err)
      })
  }
}

module.exports = Yeelight
