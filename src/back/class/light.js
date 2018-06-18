const YeelightSearch = require('yeelight-wifi')
const yeelightSearch = new YeelightSearch()

module.exports = class Light {
  getName(id) {
    switch (id) {
      case '0x00000000033601d3':
        return 'Salon'
      case '0x0000000003360d2c':
        return 'Couloir'
      case '0x0000000003312a03':
        return 'Bureau'
      case '0x000000000335ff81':
        return 'Chambre'
      case '0x000000000335f9ce':
        return 'Cuisine'
      default:
        return 'Unknown'
    }
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const lights = yeelightSearch.getYeelights()
      let list = []
      lights.map(light => {
        list.push({
          id: light.id,
          name: this.getName(light.id),
          model: light.model,
          port: light.port,
          hostname: light.hostname,
          supports: light.supports
        })
      })
      resolve(list)
    })
  }

  getValues(id) {
    return new Promise((resolve, reject) => {
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
      } else {
        reject(id)
      }
    })
  }

  toggle(id) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(id)
      if (light) {
        light.toggle()
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  refresh(id) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(id)
      if (light) {
        light.refresh()
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  turnOn(id) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(id)
      if (light) {
        light.turnOn()
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  turnOff(id) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(id)
      if (light) {
        light.turnOff()
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  setName(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.setName(options.name)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  setColorTemperature(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.setColorTemperature(options.temperature)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  setBrightness(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.setBrightness(options.brightness)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  setRGB(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.setRGB(options.hex)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  setHSV(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.setHSV(options.hue, options.staturation)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  getCron(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.getCron(options.type, options.index)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  addCron(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.addCron(options.type, options.value)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  deleteCron(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.deleteCron(options.type, options.index)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  startColorFlow(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.startColorFlow(options.count, options.action, options.flowExpression)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  stopColorFlow(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.stopColorFlow()
        resolve(light)
      } else {
        reject(id)
      }
    })
  }

  setAdjust(options) {
    return new Promise((resolve, reject) => {
      const light = yeelightSearch.getYeelightById(options.id)
      if (light) {
        light.setAdjust(options.action, options.prop)
        resolve(light)
      } else {
        reject(id)
      }
    })
  }
}
