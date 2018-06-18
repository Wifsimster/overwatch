const jsonfile = require('jsonfile')
const file = 'config/default.json'
jsonfile.spaces = 2

class Settings {
  constructor() {}

  findAll() {
    return jsonfile.readFileSync(file)
  }

  update(settings) {
    return jsonfile.writeFile(file, { settings: settings })
  }
}

module.exports = Settings
